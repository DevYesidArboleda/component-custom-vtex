import React, { useRef, useMemo } from 'react';
import videoStyle from './video-custom.css';
import SliderLayout from 'vtex.slider-layout/SliderLayout';
import { pathOr } from 'ramda';
//import Item from './item';


const VideoCustom = (props: any) => {
    //const [isVisible, setIsVisible] = useState(false);
    const itemsDesktop = pathOr<number>(1, ['itemsDesktop'], props);
    const itemsTablet = pathOr<number>(1, ['itemsTablet'], props);
    const itemsPhone = pathOr<number>(1, ['itemsPhone'], props);
    const ref = useRef(null);

    console.log(props);

    const itemsPerPage = useMemo(() => {
        return { desktop: itemsDesktop || 1, tablet: itemsTablet || 1, phone: itemsPhone || 1 };
    }, [itemsDesktop, itemsTablet, itemsPhone]);

    return (
        <div ref={ref}>
            <div className={videoStyle.init}>
                {<SliderLayout itemsPerPage={itemsPerPage}
                    fullWidth={true}
                    infinite={true}
                    showNavigationArrows={"always"}
                    centerMode="center"
                    centerModeSlidesGap="14" >
                    {
                        props.pages.map((item: any, index: number) => {
                            return (
                                // <Item item= {item}></Item>
                                <div className={videoStyle.videoContainer}>
                                    <div className="{}">
                                        <div>
                                            <iframe
                                                width="100%"
                                                height="360"
                                                src={item.url}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </SliderLayout>}
            </div>
        </div>
    );
};
VideoCustom.defaultProps = {
    pages: []
};

VideoCustom.getSchema = () => {
    return {
        title: 'Custom video',
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

export default VideoCustom;
