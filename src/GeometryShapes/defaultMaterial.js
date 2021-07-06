import * as UTILS from "cannon-es";

/**
 *  add default contactMaterial
 */
const defaultMaterial = new UTILS.Material("default");
export const contactMaterial = new UTILS.ContactMaterial(
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
