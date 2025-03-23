import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'isTwoDecimalPlaces', async: false })
  export class IsTwoDecimalPlacesConstraint implements ValidatorConstraintInterface {
    validate(value: number, args: ValidationArguments) {
      // Verifica si el número tiene exactamente 2 decimales
      return Number(value.toFixed(2)) === value;
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'porcentajeOferta debe tener exactamente 2 decimales.';
    }
  }
  
  export function IsTwoDecimalPlaces(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsTwoDecimalPlacesConstraint,
      });
    };
  }