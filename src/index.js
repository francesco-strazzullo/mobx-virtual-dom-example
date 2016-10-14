import { patch, create } from 'virtual-dom';
import { autorun } from 'mobx';

import state from './state';

let rootNode = create(state.tree);

document.body.appendChild(rootNode);

autorun(() => {
    rootNode = patch(rootNode, state.patches);
});