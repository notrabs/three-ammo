import { Quaternion, Vector3 } from "three";
export interface WorldConfig {
    epsilon?: number;
    debugDrawMode?: number;
    maxSubSteps?: number;
    fixedTimeStep?: number;
    gravity?: Vector3;
    solverIterations?: number;
}
export declare enum BodyActivationState {
    ACTIVE_TAG = "active",
    ISLAND_SLEEPING = "islandSleeping",
    WANTS_DEACTIVATION = "wantsDeactivation",
    DISABLE_DEACTIVATION = "disableDeactivation",
    DISABLE_SIMULATION = "disableSimulation"
}
export declare enum BodyType {
    STATIC = "static",
    DYNAMIC = "dynamic",
    KINEMATIC = "kinematic"
}
export interface BodyConfig {
    loadedEvent?: string;
    mass?: number;
    gravity?: Vector3;
    linearDamping?: number;
    angularDamping?: number;
    linearSleepingThreshold?: number;
    angularSleepingThreshold?: number;
    angularFactor?: Vector3;
    activationState?: BodyActivationState;
    type?: BodyType;
    emitCollisionEvents?: boolean;
    disableCollision?: boolean;
    collisionFilterGroup?: number;
    collisionFilterMask?: number;
    scaleAutoUpdate?: boolean;
}
export declare type UpdateBodyOptions = Pick<BodyConfig, "type" | "disableCollision" | "activationState" | "collisionFilterGroup" | "collisionFilterMask" | "linearDamping" | "angularDamping" | "gravity" | "linearSleepingThreshold" | "angularSleepingThreshold" | "angularFactor">;
export declare enum ShapeType {
    BOX = "box",
    CYLINDER = "cylinder",
    SPHERE = "sphere",
    CAPSULE = "capsule",
    CONE = "cone",
    HULL = "hull",
    HACD = "hacd",
    VHACD = "vhacd",
    MESH = "mesh",
    HEIGHTFIELD = "heightfield"
}
export declare enum ShapeFit {
    ALL = "all",
    MANUAL = "manual"
}
export interface ShapeConfig {
    type: ShapeType;
    margin?: number;
    includeInvisible?: boolean;
    offset?: Vector3;
    orientation?: Quaternion;
    fit?: ShapeFit;
    halfExtents?: Vector3;
    minHalfExtents?: number;
    maxHalfExtents?: number;
    cylinderAxis?: "x" | "y" | "z";
    sphereRadius?: number;
    hullMaxVertices?: number;
    compacityWeight?: number;
    volumeWeight?: number;
    nClusters?: number;
    nVerticesPerCH?: number;
    resolution?: any;
    depth?: any;
    planeDownsampling?: any;
    convexhullDownsampling?: any;
    alpha?: any;
    beta?: any;
    gamma?: any;
    pca?: any;
    mode?: any;
    maxNumVerticesPerCH?: any;
    minVolumePerCH?: any;
    convexhullApproximation?: any;
    oclAcceleration?: any;
    concavity?: number;
    heightfieldDistance?: number;
    heightfieldData?: any[];
    heightScale?: number;
    upAxis?: number;
    heightDataType?: "short" | "float";
    flipQuadEdges?: boolean;
}
export declare enum ConstraintType {
    LOCK = "lock",
    FIXED = "fixed",
    SPRING = "spring",
    SLIDER = "slider",
    HINGE = "hinge",
    CONE_TWIST = "coneTwist",
    POINT_TO_POINT = "pointToPoint"
}
