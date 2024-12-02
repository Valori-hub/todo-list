import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const testAnimation = trigger('testAnimation', [
  state('start', style({ opacity: 0.5 })),
  state('end', style({ opacity: 1 })),
  transition('start => end', [animate('1s')]),
]);
export const test1 = trigger('test1', [
  state('onScreen', style({ transform: 'translateX(0)', opacity: 1 })),
  state('offScreen', style({ transform: 'translateX(-300%)', opacity: 0.5 })),
  transition('offScreen => onScreen', [animate('{{ delay }}ms ease-in-out')], {
    params: { delay: 0 },
  }),
  transition('onScreen => offScreen', [animate('{{ delay }}ms ease-in-out')], {
    params: { delay: 0 },
  }),
]);
