import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef } from 'react';
import type { ContextMenuCordinates, ContextMenuOption } from '../../interfaces';

type ContextMenuProps = {
  options: ContextMenuOption[];
  cordinates: ContextMenuCordinates;
  contextMenu: boolean;
  setContextMenu: Dispatch<SetStateAction<boolean>>;
};

// Component of options available when click on the avatar
const ContextMenu = ({ options, cordinates, contextMenu, setContextMenu }: ContextMenuProps) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Check if the click is outside the menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target?.id !== 'context-opener' &&
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setContextMenu(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [setContextMenu]);

  // Click event for each options, then callback correspondance function
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, callback: () => void) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };

  return (
    <div
      className="bg-slate-800 fixed py-2 z-50"
      ref={contextMenuRef}
      style={{
        top: cordinates.y,
        left: cordinates.x,
      }}
    >
      <ul>
        {/* Repeatly map each option with its name and callback */}
        {options.map(({ name, callback }) => (
          <li
            key={name}
            className="px-4 py-2 cursor-pointer hover:bg-slate-900"
            onClick={(e) => handleClick(e, callback)}
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
