import * as CANNON from "cannon-es";

/**
 *  add default contactMaterial
 */
const defaultMaterial = new CANNON.Material("default");
export const contactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 1e9,
    restitution: 0.4,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
    frictionEquationStiffness: 1e8,
    frictionEquationRegularizationTime: 10,
  }
);
