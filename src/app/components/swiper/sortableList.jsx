import { Button } from '@mui/material';
import { createRef, useRef, useState } from 'react';

export default function SortableList({
  sortable = true,
  data = [],
  onReorder,
  renderItem,
  keyExtractor,
  transitionDuration = 200,
  separator,
  setSelectedImg,
  handleupdateList,
}) {
  const listRef = useRef(null);
  const separatorsRef = useRef(data.map(() => createRef()));
  const itemsRef = useRef(data.map((d, i) => createRef()));
  const [active, setActive] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(data.map((d, i) => i));

  const onSortStart = (event) =>
    sortable &&
    sortStart(
      event,
      data,
      listRef,
      itemsRef,
      separatorsRef,
      onReorder,
      setActive,
      setCurrentOrder,
      transitionDuration
    );

  return (
    <div ref={listRef} className="container-swiper">
      <Button
        variant="outlined"
        size="small"
        style={{ fontSize: '10px' }}
        sx={{
          maxHeight: 30,
        }}
        className=" m-2 self-center "
        onClick={(e) => {
          e.preventDefault();
          handleupdateList(data);
        }}
      >
        Order Update
      </Button>
      <Button
        variant="outlined"
        size="small"
        style={{ fontSize: '10px' }}
        sx={{
          maxHeight: 30,
        }}
        className=" m-2 self-center "
        onClick={(e) => {
          e.preventDefault();
          setSelectedImg({
            src: null,
            order: data.length + 1,
            id: null,
            active: true,
            title: '',
          });
        }}
        disabled={data?.length > 15}
      >
        New
      </Button>
      {data.map((item, index) => (
        <div
          key={keyExtractor(item, index)}
          onMouseUp={() => {
            setSelectedImg(item);
          }}
        >
          <div
            className="cursor-pinter"
            ref={itemsRef.current[index]}
            onMouseDown={onSortStart}
            onTouchStart={onSortStart}
            // eslint-disable-next-line react/no-children-prop
            children={renderItem(item, currentOrder[index], active === index)}
          />
          {separator && index < data.length - 1 && (
            <div ref={separatorsRef.current[index]} className="cursor-pinter">
              {separator}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const sortStart = (
  event,
  data,
  listRef,
  itemsRef,
  separatorsRef,
  onReorder,
  setActive,
  setCurrentOrder,
  transitionDuration
) => {
  if (itemsRef.current.length < 2) return;
  if (event.type === 'mousedown' && event.button > 0) return;
  if (event.type === 'touchstart' && event.touches.length > 1) return;

  const list = listRef.current;
  if (list.classList.contains('is-sorting')) return;
  list.classList.add('is-sorting');

  const css = (item, css) =>
    Object.keys(css).forEach((style) => (item.style[style] = css[style]));

  css(list, {
    position: 'relative',
    height: list.offsetHeight + 'px',
    width: list.offsetWidth + 'px',
  });

  const separators = separatorsRef.current
    .filter((ref) => ref.current)
    .map((ref, index) => {
      const dom = ref.current;
      if (dom)
        return {
          index: index,
          dom: dom,
          left: dom.offsetLeft,
          top: dom.offsetTop,
          width: dom.offsetWidth,
          height: dom.offsetHeight,
        };
    });

  const items = itemsRef.current
    .filter((ref) => ref.current)
    .map((ref, index) => {
      const dom = ref.current;
      if (dom)
        return {
          index: index,
          dom: dom,
          left: dom.offsetLeft,
          top: dom.offsetTop,
          width: dom.offsetWidth,
          height: dom.offsetHeight,
          x: dom.offsetLeft,
          y: dom.offsetTop,
          dragged: dom.contains(event.target),
        };
    });

  const dragged = items.find((item) => item.dragged);
  const spacing = items[1].top - (items[0].top + items[0].height);

  let curIndex = items.indexOf(dragged);
  let newOrder = items.map((item) => item.index);

  setActive(curIndex);

  draggable(event, {
    onStart: () => {
      separators.map((separator) =>
        css(separator.dom, {
          position: 'absolute',
          width: separator.width + 'px',
          height: separator.height + 'px',
          left: separator.left + 'px',
          top: separator.top + 'px',
          zIndex: 1,
        })
      );

      items.map((item) => {
        css(item.dom, {
          position: 'absolute',
          width: item.width + 'px',
          height: item.height + 'px',
          transform: `translateX(${item.x}px) translateY(${item.y - 20}px)`,
          zIndex: 2,
        });
        setTimeout(() => {
          if (item.dragged) return;
          css(item.dom, {
            transition: `transform ${transitionDuration}ms ease`,
          });
        });
      });

      css(dragged.dom, { zIndex: 3 });
    },
    onMove: (delta) => {
      const draggX = dragged.left + delta.x;
      const draggY = dragged.top + delta.y;

      const dragIndex = items.reduce((acc, item) => {
        if (item.index === 0) return acc;
        const shadowCenter = draggY + dragged.height / 2;
        const itemStart = item.top - spacing / 2;
        return (acc += shadowCenter > itemStart ? 1 : 0);
      }, 0);

      if (dragIndex !== curIndex) {
        newOrder[dragIndex] = newOrder.splice(
          curIndex,
          1,
          newOrder[dragIndex]
        )[0];
        curIndex = dragIndex;

        newOrder.reduce((acc, index) => {
          const item = items[index];
          item.y = acc;
          css(item.dom, {
            transform: `translateX(${item.x}) translateY(${item.y}px)`,
          });
          return (acc += item.height + spacing);
        }, 0);

        setCurrentOrder(
          newOrder.reduce((acc, cur, idx) => {
            acc[newOrder[idx]] = idx;
            return acc;
          }, [])
        );
      }

      css(dragged.dom, {
        transform: `translateX(${draggX}px) translateY(${draggY}px)`,
      });
    },
    onEnd: () => {
      setActive(null);

      css(dragged.dom, {
        transition: `all ${transitionDuration}ms ease`,
        transform: `translateX(${dragged.x}) translateY(${dragged.y}px)`,
      });

      setTimeout(() => {
        list.style = null;
        list.classList.remove('is-sorting');
        items.map((item) => (item.dom.style = null));
        separators.map((separator) => (separator.dom.style = null));
        setCurrentOrder(items.map((item) => item.index));
        onReorder(
          items.reduce((acc, cur, idx) => {
            acc[idx] = data[newOrder[idx]];
            acc[idx].order = idx + 1;
            return acc;
          }, [])
        );
      }, transitionDuration);
    },
  });
};

const draggable = (e, { onStart, onMove, onEnd }) => {
  let startPosition;

  const onDragStart = (e) => {
    const currentPosition = getPosition(e);
    onStart(startPosition);
    startPosition = currentPosition;
    const touch = e.type === 'touchstart';
    window.addEventListener(touch ? 'touchmove' : 'mousemove', onDragMove, {
      passive: false,
    });
    window.addEventListener(touch ? 'touchend' : 'mouseup', onDragEnd, false);
  };

  const onDragMove = (e) => {
    const currentPosition = getPosition(e);
    const deltaPosition = {
      x: currentPosition.x - startPosition.x,
      y: currentPosition.y - startPosition.y,
    };
    onMove(deltaPosition, currentPosition);
    e.preventDefault();
  };

  const onDragEnd = (e) => {
    const currentPosition = getPosition(e);
    onEnd(currentPosition);
    const touch = e.type === 'touchend';
    window.removeEventListener(touch ? 'touchmove' : 'mousemove', onDragMove, {
      passive: false,
    });
    window.removeEventListener(
      touch ? 'touchend' : 'mouseup',
      onDragEnd,
      false
    );
  };

  const getPosition = (e) => {
    const dragEvent = e.touches ? e.touches[0] || e.changedTouches[0] : e;
    return { x: dragEvent.pageX, y: dragEvent.pageY };
  };

  onDragStart(e);
};
