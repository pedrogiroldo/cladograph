import { phylotree } from 'phylotree';
import { useRef, useLayoutEffect } from 'react';
import $ from 'jquery';
import './style.css';

export default function Phylotree() {
  const treeContainer = useRef();
  const tree = new phylotree('(2,(1,(4,(3,(Maria Clara)))));');
  useLayoutEffect(() => {
    tree.render({
      container: treeContainer.current,
      height: 500,
      width: 500,
      'left-right-spacing': 'fit-to-size',
      'top-bottom-spacing': 'fit-to-size',
      zoom: true,
    });

    $(tree.display.container).append(tree.display.show());
  });

  return <div className="tree" ref={treeContainer} />;
}
