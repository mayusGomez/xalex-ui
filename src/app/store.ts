import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged } from 'rxjs/operators';

import { Company } from './core/models/company';


export interface State {
  company: Company ;
}

const state: State = {
  company: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(
    distinctUntilChanged()
  );

  get value() : State {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe( pluck(name) );
  }

  set(name: string, state_: any) {
    this.subject.next({...this.value, [name]: state_});
  }

  add(name: string, state_: any) {
    const new_add_state = this.value[name].concat(state_);
    this.subject.next({...this.value, [name]: new_add_state});
  }

}


