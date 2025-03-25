/* eslint-disable prettier/prettier */
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,    
    registerDecorator,
    ValidationOptions,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'isTwoDecimalPlaces', async: false })
  export class IsTwoDecimalPlacesConstraint implements ValidatorConstraintInterface {
    validate(value: number ) {
      // Verifica si el número tiene exactamente 2 decimales
      return Number(value.toFixed(2)) === value;
    }
  
    defaultMessage() {
      return 'porcentajeOferta debe tener exactamente 2 decimales.';
    }
  }
  
  export function IsTwoDecimalPlaces(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsTwoDecimalPlacesConstraint,
      });
    };
  }