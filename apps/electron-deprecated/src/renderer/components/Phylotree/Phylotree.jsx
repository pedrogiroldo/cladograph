/* eslint-disable react-hooks/rules-of-hooks */
import { phylotree as Phylotree } from 'phylotree';
import { useRef, useLayoutEffect } from 'react';
import $ from 'jquery';
import './style.css';

export default function treeComponent() {
  const treeContainer = useRef();
  const tree = new Phylotree('(2,(1,(4,(3,(Maria Clara)))));');
  useLayoutEffect(() => {
    tree.render({
      container: treeContainer.current,
      height: 500,
      width: 500,
      'left-right-spacing': 'fit-to-size',
      'top-bottom-spacing': 'fit-to-size',
      zoom: false,
    });

    $(tree.display.container).append(tree.display.show());
  });

  return <div className="tree" ref={treeContainer} />;
}
