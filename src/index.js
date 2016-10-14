import {h,diff,patch,create} from 'virtual-dom';
import {observable, autorun} from 'mobx';

const STEP = 20;

let lastRenderedTree = false;

const onRightButton = () => {
    state.left += STEP;
};

const onLeftButton = () => {
    state.left -= STEP;
};

const onUpButton = () => {
    state.top -= STEP;
};

const onDownButton = () => {
    state.top += STEP;
};

const state = observable({
    left:200,
    top:0,
    get patches(){
        if(!lastRenderedTree){
            return;
        }

        const position = {
            left:state.left,
            top:state.top
        };

        const newTree = render(position);
        const patches = diff(lastRenderedTree, newTree);

        return patches;
    }
});

const render = ({left,top}) => {

    const square = h('div',{
        style: {
            backgroundColor: 'red',
            width: '100px',
            height: '100px',
            position: 'fixed',
            left: left + 'px',
            top: top + 'px'
        }
    });

    const leftButton = h('button',{
        onclick:onLeftButton
    },['Left']);

    const rightButton = h('button',{
        onclick:onRightButton
    },['Right']);

    const upButton = h('button',{
        onclick:onUpButton
    },['Up']);

    const downButton = h('button',{
        onclick:onDownButton
    },['Down']);

    return h('div', {},[leftButton,rightButton,upButton,downButton,square]);
};

lastRenderedTree = render(state);

let rootNode = create(lastRenderedTree);

autorun(() => {
    rootNode = patch(rootNode, state.patches);
});

document.body.appendChild(rootNode);