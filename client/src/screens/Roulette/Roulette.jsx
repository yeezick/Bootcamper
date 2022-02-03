import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
// assets
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects } from '../../services/redux/slices/projectActions';

export const Roulette = () => {
  const dispatch = useDispatch();
  const [currProject, setCurrProject] = useState(null);
  const { projects, isLoaded } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchAllProjects());
    setCurrProject(projects[0]);
  }, [isLoaded]);

  console.log('project', currProject);

  if (!currProject) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <header>Roulette</header>
      <div className="roulette-visual">I am an image</div>
      <p>{currProject.title}</p>
      <p>{currProject.description}</p>
      <div className="roulette-tools">
        <p> Built with:</p>
        {/* map thru tools */}
      </div>
      <p>{`Looking for collaboratos who can commit at least X hours per week`}</p>
      <button>I'll Pass</button>
      <button>I'm interested</button>
      <button>Skip for now</button>
      <button> Create my own</button>
    </div>
  );
};
