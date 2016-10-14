import {h,diff,patch,create} from 'virtual-dom';

let left = 0;
let top = 0;

const move = () => {
    const newTree = render({left,top});
    const patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
    tree = newTree;
};

const onInputChange = (event) => {
    left = parseInt(event.target.value,10);
};

const render = ({left,top}) => {

    const input = h('input', {
        type: 'text',
        value: left,
        oninput:onInputChange
    });

    return h('div', {
        style: {
            textAlign: 'center',
            lineHeight: '100px',
            border: '1px solid red',
            width: '100px',
            height: '100px',
            position: 'fixed',
            left: left + 'px',
            top: top + 'px'
        },
        onclick: move
    },['Click to move',input]);
};

let tree = render({left,top});

let rootNode = create(tree);

document.body.appendChild(rootNode);