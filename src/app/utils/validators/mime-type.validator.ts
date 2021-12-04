import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

/**
 * Validador de archivos de imagenes.
 */
export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const file_reader = new FileReader();
  const file_reader$ = of((observer: Observer<{ [key: string]: any }>) => {
    file_reader.addEventListener('loadend', () => {
      const arr = new Uint8Array(file_reader.result as ArrayBuffer).subarray(
        0,
        4
      );
      let header = '';
      let is_valid = false;
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case '89504e47':
          is_valid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          is_valid = true;
          break;

        default:
          is_valid = false;
          break;
      }
      if (is_valid) observer.next(null);
      else observer.next({ notValid: true });

      observer.complete();
    });
    file_reader.readAsArrayBuffer(file);
  });

  return file_reader$;
};
