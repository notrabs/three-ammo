import { Matrix4, Vector3 } from "three";
import { BodyActivationState, BodyConfig, BodyType, UpdateBodyOptions } from "./types";
import World from "./world";
/**
 * Initializes a body component, assigning it to the physics system and binding listeners for
 * parsing the elements geometry.
 */
export default class Body {
    loadedEvent: string;
    mass: number;
    gravity: Ammo.btVector3;
    linearDamping: number;
    angularDamping: number;
    linearSleepingThreshold: number;
    angularSleepingThreshold: number;
    angularFactor: Vector3;
    activationState: BodyActivationState;
    type: BodyType;
    emitCollisionEvents: boolean;
    collisionFilterGroup: number;
    collisionFilterMask: number;
    scaleAutoUpdate: boolean;
    matrix: Matrix4;
    shapes: Ammo.btCollisionShape[];
    world: World;
    disableCollision: boolean;
    physicsBody: Ammo.btRigidBody;
    localScaling: Ammo.btVector3;
    prevScale: any;
    prevNumChildShapes: number;
    msTransform: Ammo.btTransform;
    rotation: Ammo.btQuaternion;
    motionState: Ammo.btDefaultMotionState;
    localInertia: Ammo.btVector3;
    compoundShape: Ammo.btCompoundShape;
    rbInfo: Ammo.btRigidBodyConstructionInfo;
    shapesChanged: boolean;
    polyHedralFeaturesInitialized: boolean;
    triMesh: Ammo.btTriangleMesh;
    constructor(bodyConfig: BodyConfig, matrix: Matrix4, world: World);
    /**
     * Parses an element's geometry and component metadata to create an Ammo body instance for the component.
     */
    _initBody(): void;
    /**
     * Updates the body when shapes have changed. Should be called whenever shapes are added/removed or scale is changed.
     */
    updateShapes(): void;
    /**
     * Update the configuration of the body.
     */
    update(bodyConfig: UpdateBodyOptions): void;
    /**
     * Removes the component and all physics and scene side effects.
     */
    destroy(): void;
    /**
     * Updates the rigid body's position, velocity, and rotation, based on the scene.
     */
    syncToPhysics(setCenterOfMassTransform?: boolean): void;
    /**
     * Updates the scene object's position and rotation, based on the physics simulation.
     */
    syncFromPhysics(): void;
    addShape(collisionShape: any): void;
    removeShape(collisionShape: any): void;
    updateMass(): void;
    updateCollisionFlags(): void;
    getVelocity(): Ammo.btVector3;
}
