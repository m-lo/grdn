
import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { example, lsystem } from './sketches'

function App() {
  const ref1 = useRef();
  const ref2 = useRef();
  useEffect(() => {
      const i1 = new p5(example, ref1.current);
      const i2 = new p5(lsystem, ref2.current);
      return () => {
          i1.remove();
          i2.remove();
      }
  }, []);

  return (
    <div>
      <div ref={ref1} />
      <div ref={ref2} />
    </div>
  );
}

export default App;
