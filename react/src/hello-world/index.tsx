import React, { useEffect, useRef, useState } from 'react';
import HelloWorldStyle from './hello-world.css';

const HelloWorld = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  console.log(props);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          console.log('El componente está visible en el viewport.');
        }else {
            setIsVisible(false); 
        }
      },
      { threshold: 0.1 } // El 10% del componente debe ser visible para disparar el evento
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      <div className={HelloWorldStyle.init}>
        <div>&#9996;</div>
        {isVisible == true ? 
            <div className={HelloWorldStyle.look}>
                {
                    props.pages.map((item:any, index:number) => {
                        return (
                            <div className={HelloWorldStyle.masterPropsLook}>
                                <div className={HelloWorldStyle.containerPropsLook}>                                
                                <div className={HelloWorldStyle.imageProps}>
                                    <img src={item.image} alt="Imagen"></img>
                                </div>
                                <div className={HelloWorldStyle.textProps}>
                                    {item.__editorItemTitle}
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        : 
        <div className={HelloWorldStyle.notlook}>
                {
                    props.pages.map((item:any, index:number) => {
                        return (
                            <div className={HelloWorldStyle.masterProps}>
                                <div className={HelloWorldStyle.containerProps}>                                
                                <div className={HelloWorldStyle.imageProps}>
                                    <img src={item.image} alt="Imagen"></img>
                                </div>
                                <div className={HelloWorldStyle.textProps}>
                                    {item.__editorItemTitle}
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
        </div>}
      </div>
    </div>
  );
};
HelloWorld.defaultProps = {
  pages: []
};
HelloWorld.getSchema = () => {
  return {
    title: 'Componente custom',
    type: 'object',
    properties: {
      pages: {
        title: 'Links',
        type: 'array',
        items: {
          title: 'Links',
          type: 'object',
          properties: {
            __editorItemTitle: {
              title: 'Title',
              type: 'string'
            },
            url: {
              title: 'Url',
              type: 'string'
            },
            image: {
              title: 'Content',
              type: 'string',
              widget: {
                'ui:widget': 'image-uploader'
              }
            }
          }
        }
      }
    }
  };
};

export default HelloWorld;
