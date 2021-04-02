export declare const CONSTANTS: {
    GRAVITY: number;
    MAX_INTERVAL: number;
    ITERATIONS: number;
    SIMULATION_RATE: number;
    ACTIVATION_STATE: {
        ACTIVE_TAG: string;
        ISLAND_SLEEPING: string;
        WANTS_DEACTIVATION: string;
        DISABLE_DEACTIVATION: string;
        DISABLE_SIMULATION: string;
    };
    COLLISION_FLAG: {
        STATIC_OBJECT: number;
        KINEMATIC_OBJECT: number;
        NO_CONTACT_RESPONSE: number;
        CUSTOM_MATERIAL_CALLBACK: number;
        CHARACTER_OBJECT: number;
        DISABLE_VISUALIZE_OBJECT: number;
        DISABLE_SPU_COLLISION_PROCESSING: number;
    };
    TYPE: {
        STATIC: string;
        DYNAMIC: string;
        KINEMATIC: string;
    };
    SHAPE: {
        BOX: string;
        CYLINDER: string;
        SPHERE: string;
        CAPSULE: string;
        CONE: string;
        HULL: string;
        HACD: string;
        VHACD: string;
        MESH: string;
        HEIGHTFIELD: string;
    };
    FIT: {
        ALL: string;
        MANUAL: string;
    };
    CONSTRAINT: {
        LOCK: string;
        FIXED: string;
        SPRING: string;
        SLIDER: string;
        HINGE: string;
        CONE_TWIST: string;
        POINT_TO_POINT: string;
    };
    MESSAGE_TYPES: {
        INIT: number;
        READY: number;
        ADD_BODY: number;
        BODY_READY: number;
        UPDATE_BODY: number;
        REMOVE_BODY: number;
        ADD_SHAPES: number;
        REMOVE_SHAPES: number;
        ADD_CONSTRAINT: number;
        REMOVE_CONSTRAINT: number;
        ENABLE_DEBUG: number;
        RESET_DYNAMIC_BODY: number;
        ACTIVATE_BODY: number;
        TRANSFER_DATA: number;
        SET_MOTION_STATE: number;
        SET_LINEAR_VELOCITY: number;
        SET_ANGULAR_VELOCITY: number;
        APPLY_FORCE: number;
        APPLY_CENTRAL_FORCE: number;
        APPLY_IMPULSE: number;
        APPLY_CENTRAL_IMPULSE: number;
        APPLY_TORQUE_IMPULSE: number;
        CLEAR_FORCES: number;
        SET_RESTITUTION: number;
        SET_FRICTION: number;
        SET_SPINNING_FRICTION: number;
        SET_ROLLING_FRICTION: number;
    };
    BUFFER_CONFIG: {
        HEADER_LENGTH: number;
        MAX_BODIES: number;
        MATRIX_OFFSET: number;
        LINEAR_VELOCITY_OFFSET: number;
        ANGULAR_VELOCITY_OFFSET: number;
        COLLISIONS_OFFSET: number;
        BODY_DATA_SIZE: number;
    };
    BUFFER_STATE: {
        UNINITIALIZED: number;
        READY: number;
        CONSUMED: number;
    };
};
export declare function createAmmoWorker(): any;
export declare const WorkerHelpers: (ammoWorker: any) => {
    addBody(uuid: any, mesh: any, options?: {}): void;
    updateBody(uuid: any, options: any): void;
    removeBody(uuid: any): void;
    addShapes(bodyUuid: any, shapesUuid: any, mesh: any, options?: {}): void;
    removeShapes(bodyUuid: any, shapesUuid: any): void;
    addConstraint(constraintId: any, bodyUuid: any, targetUuid: any, options?: {}): void;
    removeConstraint(constraintId: any): void;
    enableDebug(enable: any, debugSharedArrayBuffer: any): void;
    resetDynamicBody(uuid: any): void;
    activateBody(uuid: any): void;
    bodySetMotionState(uuid: any, position: any, rotation: any): void;
    bodySetLinearVelocity(uuid: any, velocity: any): void;
    bodyApplyImpulse(uuid: any, impulse: any, relativeOffset: any): void;
    bodyApplyForce(uuid: any, force: any, relativeOffset: any): void;
};
