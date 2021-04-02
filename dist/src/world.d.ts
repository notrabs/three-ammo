import { WorldConfig } from "./types";
export default class World {
    collisionConfiguration: Ammo.btSoftBodyRigidBodyCollisionConfiguration;
    dispatcher: Ammo.btCollisionDispatcher;
    broadphase: Ammo.btDbvtBroadphase;
    solver: Ammo.btSequentialImpulseConstraintSolver;
    physicsWorld: Ammo.btSoftRigidDynamicsWorld;
    debugDrawer: any;
    object3Ds: Map<any, any>;
    collisions: Map<any, any>;
    collisionKeys: any[];
    epsilon: number;
    debugDrawMode: number;
    maxSubSteps: number;
    fixedTimeStep: number;
    softBodySolver: Ammo.btDefaultSoftBodySolver;
    constructor(worldConfig: WorldConfig);
    isDebugEnabled(): boolean;
    addBody(body: any, object3D: any, group: any, mask: any): void;
    removeBody(body: any): void;
    updateBody(body: any): void;
    step(deltaTime: any): void;
    destroy(): void;
    getDebugDrawer(debugIndexArray: any, debugMatricesArray: any, debugColorsArray: any, options: any): any;
}
