import {SafeResourceUrl} from "@angular/platform-browser";

export interface PhotoOutPut {
  base64Str: string;
  userId: string;
  photoId: number;
  picture?: SafeResourceUrl;
}
