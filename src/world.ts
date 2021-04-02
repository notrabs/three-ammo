import { WorldConfig } from "./types";
import { AmmoDebugConstants, AmmoDebugDrawer } from "ammo-debug-drawer";
import { CONSTANTS } from "../constants";

const EPS = 10e-6;

export default class World {
  collisionConfiguration: Ammo.btSoftBodyRigidBodyCollisionConfiguration;
  dispatcher: Ammo.btCollisionDispatcher;
  broadphase: Ammo.btDbvtBroadphase;
  solver: Ammo.btSequentialImpulseConstraintSolver;
  physicsWorld: Ammo.btSoftRigidDynamicsWorld;
  debugDrawer = null;

  object3Ds = new Map();
  collisions = new Map();
  collisionKeys = [];
  epsilon: number;
  debugDrawMode: number;
  maxSubSteps: number;
  fixedTimeStep: number;
  softBodySolver: Ammo.btDefaultSoftBodySolver;

  constructor(worldConfig: WorldConfig) {
    this.epsilon = worldConfig.epsilon || EPS;
    this.debugDrawMode = worldConfig.debugDrawMode || AmmoDebugConstants.NoDebug;
    this.maxSubSteps = worldConfig.maxSubSteps || 4;
    this.fixedTimeStep = worldConfig.fixedTimeStep || 1 / 60;
    this.collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
    this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
    this.broadphase = new Ammo.btDbvtBroadphase();
    this.solver = new Ammo.btSequentialImpulseConstraintSolver();
    this.softBodySolver = new Ammo.btDefaultSoftBodySolver();
    this.physicsWorld = new Ammo.btSoftRigidDynamicsWorld(
      this.dispatcher,
      this.broadphase,
      this.solver,
      this.collisionConfiguration,
      this.softBodySolver
    );
    // this.physicsWorld.setForceUpdateAllAabbs(false);
    const gravity = new Ammo.btVector3(0, CONSTANTS.GRAVITY, 0);
    if (worldConfig.hasOwnProperty("gravity")) {
      gravity.setValue(worldConfig.gravity.x, worldConfig.gravity.y, worldConfig.gravity.z);
    }
    this.physicsWorld.setGravity(gravity);
    Ammo.destroy(gravity);
    this.physicsWorld.getSolverInfo().set_m_numIterations(worldConfig.solverIterations || 10);
  }

  isDebugEnabled() {
    return this.debugDrawMode !== AmmoDebugConstants.NoDebug;
  }

  /* @param {Ammo.btCollisionObject} body */
  addBody(body, object3D, group, mask) {
    this.physicsWorld.addRigidBody(body, group, mask);
    // @ts-ignore
    this.object3Ds.set(Ammo.getPointer(body), object3D);
  }

  removeBody(body) {
    this.physicsWorld.removeRigidBody(body);
    // @ts-ignore
    const bodyptr = Ammo.getPointer(body);
    this.object3Ds.delete(bodyptr);
    this.collisions.delete(bodyptr);
    const idx = this.collisionKeys.indexOf(bodyptr);
    if (idx !== -1) {
      this.collisionKeys.splice(idx, 1);
    }
  }

  updateBody(body) {
    // @ts-ignore
    if (this.object3Ds.has(Ammo.getPointer(body))) {
      this.physicsWorld.updateSingleAabb(body);
    }
  }

  step(deltaTime) {
    this.physicsWorld.stepSimulation(deltaTime, this.maxSubSteps, this.fixedTimeStep);

    for (let k = 0; k < this.collisionKeys.length; k++) {
      this.collisions.get(this.collisionKeys[k]).length = 0;
    }

    const numManifolds = this.dispatcher.getNumManifolds();
    for (let i = 0; i < numManifolds; i++) {
      const persistentManifold = this.dispatcher.getManifoldByIndexInternal(i);
      const numContacts = persistentManifold.getNumContacts();
      // @ts-ignore
      const body0ptr = Ammo.getPointer(persistentManifold.getBody0());
      // @ts-ignore
      const body1ptr = Ammo.getPointer(persistentManifold.getBody1());

      for (let j = 0; j < numContacts; j++) {
        const manifoldPoint = persistentManifold.getContactPoint(j);
        const distance = manifoldPoint.getDistance();
        if (distance <= this.epsilon) {
          if (!this.collisions.has(body0ptr)) {
            this.collisions.set(body0ptr, []);
            this.collisionKeys.push(body0ptr);
          }
          if (this.collisions.get(body0ptr).indexOf(body1ptr) === -1) {
            this.collisions.get(body0ptr).push(body1ptr);
          }
          if (!this.collisions.has(body1ptr)) {
            this.collisions.set(body1ptr, []);
            this.collisionKeys.push(body1ptr);
          }
          if (this.collisions.get(body1ptr).indexOf(body0ptr) === -1) {
            this.collisions.get(body1ptr).push(body0ptr);
          }
          break;
        }
      }
    }

    if (this.debugDrawer) {
      this.debugDrawer.update();
    }
  }

  destroy() {
    Ammo.destroy(this.collisionConfiguration);
    Ammo.destroy(this.dispatcher);
    Ammo.destroy(this.broadphase);
    Ammo.destroy(this.solver);
    Ammo.destroy(this.softBodySolver);
    Ammo.destroy(this.physicsWorld);
    Ammo.destroy(this.debugDrawer);
  }

  getDebugDrawer(debugIndexArray, debugMatricesArray, debugColorsArray, options) {
    if (!this.debugDrawer) {
      options = options || {};
      options.debugDrawMode = options.debugDrawMode || this.debugDrawMode;
      this.debugDrawer = new AmmoDebugDrawer(
        debugIndexArray,
        debugMatricesArray,
        debugColorsArray,
        this.physicsWorld,
        options
      );
    }

    return this.debugDrawer;
  }
}
