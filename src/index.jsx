import  React,{useState, useEffect} from 'react';


const DEFAULT_PARAMS = {
  title: '',
  custom_class: '',
  movable: true,
  width: '500px',

  close_button: {
    active: false,
    title: 'X',
    callback: () => {},
  },
  save_button: {
    active: false,
    title: 'Save',
    callback: () => {},
  },
  cancel_button: {
    active: false,
    title: 'Cancel',
    callback: () => {},
  },
};

const Modale =({params, children})=> {
  params = {
    ...DEFAULT_PARAMS,
    ...params,
  };

  const handleButton = callback => {
    if (callback) {
      callback();
    }
  };
  const classCustom =
    params.custom_class !== '' &&
    params.custom_class !== undefined &&
    params.custom_class !== null
      ? params.custom_class
      : 'modale-window';

  //moveable
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  const [modalePos, setModalePos] = useState({x: 100, y: 100});
  const [offsetPos, setoffsetPos] = useState(mousePos);

  const [modaleIsMoving, setModaleIsMoving] = useState(false);
  const handleClick = e => {
    //get the offset pos
    if (params.movable && e.target.tagName !== 'BUTTON') {
      var rect = e.target.getBoundingClientRect();

      setoffsetPos({x: e.clientX - rect.left, y: e.clientY - rect.top});

      setModaleIsMoving(!modaleIsMoving);
      if (modaleIsMoving) setModalePos({x: mousePos.x, y: mousePos.y});
    }
  };

  useEffect(() => {
    const handleMouseMove = event => {
      setMousePos({x: event.clientX, y: event.clientY});
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  //render
  return (
    <div
      className={`${classCustom}`}
      style={{
        minWidth: params.width,
        left: `${
          !modaleIsMoving ? modalePos.x - offsetPos.x : mousePos.x - offsetPos.x
        }px`,
        top: `${
          !modaleIsMoving ? modalePos.y - offsetPos.y : mousePos.y - offsetPos.y
        }px`,
      }}>
      {params.title !== '' || params.close_button.active ? (
        <div
          className={`${classCustom}-header`}
          onClick={handleClick}
          style={modaleIsMoving ? {cursor: 'move'} : null}>
          <span className={`${classCustom}-title`}>{params.title}</span>

          {params.close_button.active ? (
            <button
              className={`${classCustom}-close`}
              onClick={() => handleButton(params.close_button?.callback)}>
              {params.close_button.title}
            </button>
          ) : null}
        </div>
      ) : null}

      <div className={`${classCustom}-main`}>{children}</div>

      {params.save_button.active || params.cancel_button.active ? (
        <div className={`${classCustom}-buttons`}>
          {params.save_button.active ? (
            <button
              className={`${classCustom}-save button-modale`}
              onClick={() => handleButton(params.save_button?.callback)}>
              {params.save_button.title}
            </button>
          ) : null}

          {params.cancel_button.active ? (
            <button
              className={`${classCustom}-cancel button-modale`}
              onClick={() => handleButton(params.cancel_button?.callback)}>
              {params.cancel_button.title}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};



export  {Modale};