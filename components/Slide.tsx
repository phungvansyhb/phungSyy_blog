import { LoadingIcon, PlayBackIcon, PlayNextIcon, ReadMoreIcon } from 'assets/icons';
import { KeyDb, ReturnPost } from 'models/blog';
import React from 'react';
import { useQuery } from 'react-query';
import { useSpringCarousel } from 'react-spring-carousel';

import { getListDocs } from 'services/fireBase.service';
import { BlogItem } from './BlogItem';
type Props = {};

export default function Slide({}: Props) {
    const { data, isLoading } = useQuery(
        'getAllPost',
        () =>
            getListDocs({
                key: KeyDb.POST,
                orderKey: 'createAt',
                count: 5,
                whereClause: [['isPublic', '==', true]],
                orderDirection: 'desc',
            }),
        {}
    );
    const { carouselFragment, slideToPrevItem, slideToNextItem } = useSpringCarousel({
        withLoop: true,
        // disableGestures: true,
        draggingSlideTreshold: 35,
        itemsPerSlide: (function () {
            if (isLoading) return 1;
            else if (Array.isArray(data)) {
                return data.length > 3 ? 3 : data.length;
            }
        })(),
        items: Array.isArray(data)
            ? (data as ReturnPost[]).map((post, key) => ({
                  id: `slide-${key}`,
                  renderItem: <BlogItem type="slide" {...post} />,
              }))
            : [
                  {
                      id: 'holder-slide',
                      renderItem: (
                          <div className="w-full h-full flex justify-center items-center">
                              <LoadingIcon className="w-8 h-8 animate-spin" />
                          </div>
                      ),
                  },
              ],
    });
    return (
        <div className="flex gap-8">
            <button
                onClick={() => {
                    console.log('prev');

                    slideToPrevItem();
                }}
                className="mobile:hidden"
            >
                <PlayBackIcon className="w-9 h-9" />
            </button>

            <div className="flex-grow overflow-hidden">{carouselFragment}</div>
            <button onClick={slideToNextItem} className="mobile:hidden">
                <PlayNextIcon className="w-9 h-9" />
            </button>
        </div>
    );
}
