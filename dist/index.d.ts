export * from "./constants";
export * from "./src/types";
export declare const WorkerHelpers: (ammoWorker: any) => {
    addBody(uuid: any, mesh: any, options?: {}): void;
    updateBody(uuid: any, options: any): void;
    removeBody(uuid: any): void;
    addShapes(bodyUuid: any, shapesUuid: any, mesh: any, options?: {}): void;
    bodySetShapesOffset(bodyUuid: any, offset: any): void;
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
