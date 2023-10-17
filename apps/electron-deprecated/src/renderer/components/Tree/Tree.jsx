/* eslint-disable react-hooks/rules-of-hooks */
import { phylotree as Phylotree } from 'phylotree';
import { useRef, useLayoutEffect } from 'react';
import $ from 'jquery';
import './style.css';
import saveTree from '../../../scripts/saveTree';

export default function Tree({ newick }) {
  const treeContainer = useRef();
  let tree;
  try {
    tree = new Phylotree(newick);
  } catch (error) {
    // eslint-disable-next-line no-void
    void 0;
  }

  useLayoutEffect(() => {
    try {
      tree.render({
        container: treeContainer.current,
        height: 500,
        width: 500,
        'left-right-spacing': 'fit-to-size',
        'top-bottom-spacing': 'fit-to-size',
        zoom: false,
      });
    } catch (error) {
      return;
    }

    $(tree.display.container).empty();
    $(tree.display.container).append(tree.display.show());
  });

  return (
    <div>
      <button
        type="button"
        id="save_image"
        onClick={() => saveTree('svg', '#tree')}
      >
        baixar
      </button>
      <div className="tree" id="tree" ref={treeContainer} />
    </div>
  );
}
