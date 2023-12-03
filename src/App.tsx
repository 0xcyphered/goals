// Tasks:
// Topology sorting a graph and Finding adjacent vertices based on edges
// Tuning Positions to convert diagonal edges to straight without through vertices or increasing edges intersections
//
// Problems:
// Rendering graphs with large number of vertex and edges ( no condition for parents or child count )
// versatility for closed chains or independent graphs
//
// Example:
// https://vasturiano.github.io/react-force-graph/example/text-nodes/index-2d.html

import Map from './Map';

function App() {
  return (
    <div className="h-screen w-screen">
      <div className="fixed h-screen w-screen bg-gray-900 overflow-hidden">
        <div className="w-[100vh] h-screen rounded-full blur-[108px] absolute top-[110px] left-[-170px] bg-gradient-to-l from-bg-bubble1-start to-bg-bubble1-stop" />
        <div className="w-[100vh] h-screen rounded-full blur-[100px] absolute top-[-217px] right-[-157px] bg-gradient-to-l from-bg-bubble2-start to-bg-bubble2-stop" />
      </div>
      <Map />
    </div>
  );
}

export default App;
