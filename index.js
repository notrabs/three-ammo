import { Matrix4 } from "three";
import constants from "./constants";
import AmmoWorker from "./src/ammo.worker";
export const CONSTANTS = constants;

export function createAmmoWorker() {
  return new AmmoWorker();
}

import { iterateGeometries } from "three-to-ammo";
const MESSAGE_TYPES = CONSTANTS.MESSAGE_TYPES;

export const WorkerHelpers = function(ammoWorker) {
  const transform = new Matrix4();
  const inverse = new Matrix4();

  return {
    addBody(uuid, mesh, options = {}) {
      inverse.copy(mesh.parent.matrixWorld).invert();
      transform.multiplyMatrices(inverse, mesh.matrixWorld);
      ammoWorker.postMessage({
        type: MESSAGE_TYPES.ADD_BODY,
        uuid,
        matrix: transform.elements,
        options
      });
    },

    updateBody(uuid, options) {
      ammoWorker.postMessage({
        type: MESSAGE_TYPES.UPDATE_BODY,
        uuid,
        options
      });
    },

    removeBody(uuid) {
      ammoWorker.postMessage({
        type: MESSAGE_TYPES.REMOVE_BODY,
        uuid
      });
    },

    addShapes(bodyUuid, shapesUuid, mesh, options = {}) {
      if (mesh) {
        inverse.copy(mesh.parent.matrix).invert();
        transform.multiplyMatrices(inverse, mesh.parent.matrix);
        const vertices = [];
        const matrices = [];
        const indexes = [];

        mesh.updateMatrixWorld(true);
        iterateGeometries(mesh, options, (vertexArray, matrix, index) => {
          vertices.push(vertexArray);
          matrices.push(matrix);
          indexes.push(index);
        });

        ammoWorker.postMessage({
          type: MESSAGE_TYPES.ADD_SHAPES,
          bodyUuid,
          shapesUuid,
          vertices,
          matrices,
          indexes,
          matrixWorld: mesh.matrixWorld.elements,
          options
        });
      } else {
        ammoWorker.postMessage({
          type: MESSAGE_TYPES.ADD_SHAPES,
          bodyUuid,
          shapesUuid,
          options
        });
      }
    },

    removeShapes(bodyUuid, shapesUuid) {
      ammoWorker.postMessage({
        type: MESSAGE_TYPES.REMOVE_SHAPES,
        bodyUuid,
        shapesUuid
      });
    },

    addConstraint(constraintId, bodyUuid, targetUuid, options = {}) {
      ammoWorker.postMessage({
        type: MESSAGE_TYPES.ADD_CONSTRAINT,
        constraintId,
        bodyUuid,
        targetUuid,
        options
      });
    },

    removeConstraint(constraintId) {
      ammoWorker.postMessage({
        type: MESSAGE_TYPES.REMOVE_CONSTRAINT,
        constraintId
      });
    },

    enableDebug(enable, debugSharedArrayBuffer) {
      ammoWorker.postMessage({
        type: MESSAGE_TYPES.ENABLE_DEBUG,
        enable,
        debugSharedArrayBuffer
      });
    },

    resetDynamicBody(uuid) {
      ammoWorker.postMessage({
        type: MESSAGE_TYPES.RESET_DYNAMIC_BODY,
        uuid
      });
    },

    activateBody(uuid) {
      ammoWorker.postMessage({
        type: MESSAGE_TYPES.ACTIVATE_BODY,
        uuid
      });
    },

    bodySetLinearVelocity(uuid, velocity) {
      ammoWorker.postMessage({
        type: MESSAGE_TYPES.SET_LINEAR_VELOCITY,
        uuid,
        velocity
      });
    }
  };
};
