import Tree from '../../components/Tree/Tree';
import './style.css';

export default function Home() {
  return (
    <div className="Home">
      <div className="treeArea">
        <Tree newick="" />
      </div>
      <div className="optionsArea">
        <div className="topArea">
          <input
            className="nwkInput"
            type="text"
            placeholder="Insira um newick aqui"
          />
          <div className="apiButton">Templates</div>
        </div>
      </div>
    </div>
  );
}
