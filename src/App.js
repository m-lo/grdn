
import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { galaxy, flock } from './sketches'

function App() {
  const ref1 = useRef();
  // const ref2 = useRef();
  const ref3 = useRef();
  useEffect(() => {
      const i1 = new p5(flock, ref1.current);
      // const i2 = new p5(lsystem, ref2.current);
      const i3 = new p5(galaxy, ref3.current);

      return () => {
          i1.remove();
          // i2.remove();
          i3.remove();
      }
  }, []);

  return (
    <div>
      <div ref={ref1} />
      {/* <div ref={ref2} /> */}
      <div ref={ref3} />
    </div>
  );
}

export default App;
