import { diff } from 'virtual-dom';
import { observable, computed } from 'mobx';
import render from './view';

class State {
    @observable left = 200;
    @observable top = 0;

    tree = render(this);

    @computed get patches(){
        const newTree = render(this);
        const patches = diff(this.tree, newTree);

        this.tree = newTree;

        return patches;
    }
}

export default new State();