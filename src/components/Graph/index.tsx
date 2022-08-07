import {
  FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { ICoordinate } from "store/coordinate/types";
import classNames from "classnames";
import  { IGraphProps } from "./types";
import { dataScaleButtons } from "./data";

import "./styles.scss";

const Graph: FC<IGraphProps> = ({ id, coordinates }) => {
  const [scaleStep, setScaleStep] = useState<number>(1);

  const resizeable = useRef<Nullable<HTMLDivElement>>(null);
  const resizerTop = useRef<Nullable<HTMLDivElement>>(null);
  const resizerRight = useRef<Nullable<HTMLDivElement>>(null);
  const resizerBottom = useRef<Nullable<HTMLDivElement>>(null);
  const resizerLeft = useRef<Nullable<HTMLDivElement>>(null);
  const resizerTopLeft = useRef<Nullable<HTMLDivElement>>(null);
  const resizerTopRight = useRef<Nullable<HTMLDivElement>>(null);
  const resizerBottomRight = useRef<Nullable<HTMLDivElement>>(null);
  const resizerBottomLeft = useRef<Nullable<HTMLDivElement>>(null);

  const createGraphAxes = useCallback<VoidFunc<void>>(() => {
    const canvas = document.getElementById(id) as Nullable<HTMLCanvasElement>;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx !== null) {
      // axes
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(250, 0);
        ctx.lineTo(250, 500);
        ctx.moveTo(0, 250);
        ctx.lineTo(500, 250);
        ctx.stroke();

        // arrows
        ctx.fillStyle = "black";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.fillText("Y", 260, 10);
        ctx.fillText("X", 490, 235);
        ctx.moveTo(250, 0);
        ctx.lineTo(255, 10);
        ctx.moveTo(250, 0);
        ctx.lineTo(245, 10);
        ctx.moveTo(500, 250);
        ctx.lineTo(490, 245);
        ctx.moveTo(500, 250);
        ctx.lineTo(490, 255);
        ctx.stroke();

        // scale X
        for (let i = 1; i < 20; i++) {
          ctx.fillStyle = "black";
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          const point = -(scaleStep * 10) + scaleStep * i;
          if (String(point).length === 1 && point !== 0) {
            ctx.fillText(String(point), 25 * i - 3, 265);
          } else if (String(point).length === 2) {
            ctx.fillText(String(point), 25 * i - 5, 265);
          } else if (String(point).length === 3) {
            ctx.fillText(String(point), 25 * i - 8, 265);
          } else if (String(point).length === 4) {
            ctx.fillText(String(point), 25 * i - 12, 265);
          }
          ctx.moveTo(25 * i, 250);
          ctx.lineTo(25 * i, 255);
          ctx.stroke();
        }

        // scale Y
        for (let i = 1; i < 20; i++) {
          ctx.fillStyle = "black";
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          const point = (scaleStep * 10) - scaleStep * i;
          if (String(point).length === 1 && point !== 0) {
            ctx.fillText(String(point), 235, 25 * i + 2.5);
          } else if (String(point).length === 2) {
            ctx.fillText(String(point), 232, 25 * i + 2.5);
          } else if (String(point).length === 3) {
            ctx.fillText(String(point), 226, 25 * i + 2.5);
          } else if (String(point).length === 4) {
            ctx.fillText(String(point), 220, 25 * i + 2.5);
          }
          ctx.moveTo(250, 25 * i);
          ctx.lineTo(245, 25 * i);
          ctx.stroke();
        }
      }
    }
  }, [id, scaleStep]);

  const writeGraph = useCallback<VoidFunc<ICoordinate[]>>((coord) => {
    const canvas = document.getElementById(id) as Nullable<HTMLCanvasElement>;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx !== null) {
        ctx.fillStyle = "red";
        ctx.lineWidth = 4.0;
        ctx.beginPath();
        coord.map((elem, i) => {
          ctx.fillRect((elem.x * 25) / scaleStep + 245, -((elem.y * 25) / scaleStep) + 245, 10, 10);
          if (i > 0) {
            return ctx.lineTo((elem.x * 25) / scaleStep + 250, -((elem.y * 25) / scaleStep) + 250);
          }
          return ctx.moveTo((elem.x * 25) / scaleStep + 250, -((elem.y * 25) / scaleStep) + 250);
        });
        ctx.stroke();
      }
    }
  }, [id, scaleStep]);

  const setScale = useCallback<EventFunc<React.MouseEvent<HTMLButtonElement>>>((e) => {
    setScaleStep(Number(e.currentTarget.value));
  }, []);

  const startResizing = useCallback(() => {
    const resizeableElement = resizeable.current;
    const styles = window.getComputedStyle(resizeableElement!);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    // Right resize
    const onMouseMoveRightResize = (e: MouseEvent) => {
      const dx = e.clientX - x;
      x = e.clientX;
      width += dx;
      resizeableElement!.style.width = `${width}px`;
    };

    const onMouseUpRightResize = () => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (e: MouseEvent) => {
      x = e.clientX;
      resizeableElement!.style.left = styles.left;
      resizeableElement!.style.right = "";
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Top resize
    const onMouseMoveTopResize = (e: MouseEvent) => {
      const dy = e.clientY - y;
      height -= dy;
      y = e.clientY;
      resizeableElement!.style.height = `${height}px`;
    };

    const onMouseUpTopResize = () => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (e: MouseEvent) => {
      y = e.clientY;
      resizeableElement!.style.bottom = styles.bottom;
      resizeableElement!.style.top = "";
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (e: MouseEvent) => {
      const dy = e.clientY - y;
      height += dy;
      y = e.clientY;
      resizeableElement!.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = () => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (e: MouseEvent) => {
      y = e.clientY;
      // const currentStyles = window.getComputedStyle(resizeableElement!);
      resizeableElement!.style.top = styles.top;
      resizeableElement!.style.bottom = "";
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (e: MouseEvent) => {
      const dx = e.clientX - x;
      x = e.clientX;
      width -= dx;
      resizeableElement!.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = () => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize as any);
    };

    const onMouseDownLeftResize = (e: MouseEvent) => {
      x = e.clientX;
      resizeableElement!.style.right = styles.right;
      resizeableElement!.style.left = "";
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    resizerRight.current!.addEventListener("mousedown", onMouseDownRightResize);
    resizerTop.current!.addEventListener("mousedown", onMouseDownTopResize);
    resizerBottom.current!.addEventListener("mousedown", onMouseDownBottomResize);
    resizerLeft.current!.addEventListener("mousedown", onMouseDownLeftResize);
    resizerTopLeft.current!.addEventListener("mousedown", onMouseDownLeftResize);
    resizerTopLeft.current!.addEventListener("mousedown", onMouseDownTopResize);
    resizerTopRight.current!.addEventListener("mousedown", onMouseDownRightResize);
    resizerTopRight.current!.addEventListener("mousedown", onMouseDownTopResize);
    resizerBottomLeft.current!.addEventListener("mousedown", onMouseDownLeftResize);
    resizerBottomLeft.current!.addEventListener("mousedown", onMouseDownBottomResize);
    resizerBottomRight.current!.addEventListener("mousedown", onMouseDownRightResize);
    resizerBottomRight.current!.addEventListener("mousedown", onMouseDownBottomResize);
  }, []);

  useEffect(() => {
    createGraphAxes();
  }, [createGraphAxes, coordinates]);

  useEffect(() => {
    if (coordinates.length > 0) {
      writeGraph(coordinates);
    }
  }, [coordinates, writeGraph]);

  useEffect(() => {
    startResizing();
  }, [startResizing]);

  const scaleButtons = useMemo<ReactNode>(() => (
    dataScaleButtons.map((elem, i) => {
      const buttonClassName = classNames("Graph__button", {
        Graph__button_active: elem.value === scaleStep,
      });
      return (
        <button
          key={`scale_button_${i + 1}`}
          className={buttonClassName}
          value={elem.value}
          onClick={setScale}
        >
          {elem.name}
        </button>
      );
    })
  ), [scaleStep, setScale]);

  return (
    <div className="Graph">
      <div
        id={`wrap_${id}`}
        className="Graph__canvas-wrap"
        ref={resizeable}
      >
        <div className="Graph__panel">
          <p className="Graph__title">Scale:</p>
          <div className="Graph__buttons">{scaleButtons}</div>
        </div>
        <canvas
          id={id}
          className="Graph__canvas"
          width={500}
          height={500}
        />

        <div
          className="Graph__side-resizer Graph__side-resizer_top"
          ref={resizerTop}
        />
        <div
          className="Graph__side-resizer Graph__side-resizer_right"
          ref={resizerRight}
        />
        <div
          className="Graph__side-resizer Graph__side-resizer_bottom"
          ref={resizerBottom}
        />
        <div
          className="Graph__side-resizer Graph__side-resizer_left"
          ref={resizerLeft}
        />
        <div
          className="Graph__corner-resizer Graph__corner-resizer_top-left"
          ref={resizerTopLeft}
        />
        <div
          className="Graph__corner-resizer Graph__corner-resizer_top-right"
          ref={resizerTopRight}
        />
        <div
          className="Graph__corner-resizer Graph__corner-resizer_bottom-right"
          ref={resizerBottomRight}
        />
        <div
          className="Graph__corner-resizer Graph__corner-resizer_bottom-left"
          ref={resizerBottomLeft}
        />
      </div>
    </div>
  );
};

export default Graph;
