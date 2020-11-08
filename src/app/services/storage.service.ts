import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
 
  constructor() { }

  // JSON "set" example
async setObject(key , obj) {
  await Storage.set({
    key: key,
    value: JSON.stringify(obj)
  });
}

// JSON "get" example
async getObject(key) {
  const ret = await Storage.get({ key: key });
  const user = JSON.parse(ret.value);
  return user;
}

async setItem(key, value) {
  await Storage.set({
    key: key,
    value: value
  });
}

async getItem(key) {
  const { value } = await Storage.get({ key: key });
  return value;
}

async removeItem(key) {
  await Storage.remove({ key: key });
}

async clear() {
  await Storage.clear();
}
}
