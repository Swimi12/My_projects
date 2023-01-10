import { Injectable } from '@angular/core';

interface ScriptItem {
  name: string;
  src: string;
}

@Injectable({
  providedIn: 'root',
})
export class DynamicScriptLoaderService {
  readonly scriptStore: Array<ScriptItem> = [
    {
      name: 'google',
      src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD10cqCnWoKBFIRi563eUKkfLxjbiVYR-E&region=EN&language=en&v=weekly',
    },
  ];
  private scripts: any = {};

  constructor() {
    this.scriptStore.forEach((script: ScriptItem) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src,
      };
    });
  }

  load(...scripts: string[]) {
    const promises: object[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        // Load script
        if (typeof window !== 'undefined') {
          let script: any = document.createElement('script');
          script.type = 'text/javascript';
          script.src = this.scripts[name].src;
          if (script.readyState) {
            // IE
            script.onratechange = () => {
              if (script.readyState === 'complete') {
                script.onratechange = null;
                this.scripts[name].loaded = true;
                resolve({ script: name, loaded: true, status: 'Loaded' });
              }
            };
          } else {
            // Others
            script.onload = () => {
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            };
          }
          script.onerror = (error: any) =>
            resolve({ script: name, loaded: false, status: 'Loaded' });
          if (typeof window !== 'undefined') {
            document.getElementsByTagName('head')[0].appendChild(script);
          }
        }
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }
}
