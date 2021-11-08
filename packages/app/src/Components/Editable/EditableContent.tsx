import React, { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import usePrevious from '../../Hooks/usePrevious';

const initialBlock: IEditableBlock = { id: nanoid(), html: '', tag: 'p' };

interface IEditableBlock {
  id: string;
  html: string;
  tag: 'p' | 'h1' | 'h2' | 'h3';
  ref?: HTMLElement;
}

const setCaretToEnd = (element: HTMLElement) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus();
};

type EditableContentProps = {
  placeholderText: string;
};

export const EditableContent = () => {
  const [blocks, setBlocks] = useState<IEditableBlock[]>([initialBlock]);
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null);
  const [caretMoved, setCaretMoved] = useState<{
    direction: 'up' | 'down';
    id: string;
  } | null>(null);

  const prevBlocks = usePrevious<IEditableBlock[]>(blocks);

  useEffect(() => {
    // If a new block was added, move the caret to it
    if (
      prevBlocks &&
      prevBlocks.length + 1 === blocks.length &&
      currentBlockId
    ) {
      const nextBlockPosition =
        blocks.map((b) => b.id).indexOf(currentBlockId) + 1 + 1;
      const nextBlock = document.querySelector(
        `[data-position="${nextBlockPosition}"]`
      ) as HTMLElement;
      if (nextBlock) {
        nextBlock.focus();
      }
    }
    // If a block was deleted, move the caret to the end of the last block
    if (
      prevBlocks &&
      prevBlocks.length - 1 === blocks.length &&
      currentBlockId
    ) {
      const lastBlockPosition = prevBlocks
        .map((b) => b.id)
        .indexOf(currentBlockId);
      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`
      ) as HTMLElement;
      if (lastBlock) {
        setCaretToEnd(lastBlock);
      }
    }
    // Handle move between blocks (pageUp/ pageDown) TODO: arrow keys
    if (caretMoved !== null) {
      const index = blocks.map((b) => b.id).indexOf(caretMoved.id) + 1;
      const nextBlock = document.querySelector(
        `[data-position="${
          caretMoved.direction === 'up' ? index - 1 : index + 1
        }"]`
      ) as HTMLElement;
      if (nextBlock) {
        nextBlock.focus();
      }
      setCaretMoved(null);
    }
  }, [blocks, currentBlockId, prevBlocks, caretMoved]);

  const updateBlockHandler = useCallback(
    (id: string, content: IBlockContent) => {
      const idx = blocks.map((b) => b.id).indexOf(id);
      setBlocks([
        ...blocks.slice(0, idx),
        {
          ...blocks[idx],
          html: content.html,
          tag: content.tag,
        },
        ...blocks.slice(idx + 1),
      ]);
    },
    [blocks]
  );

  const addBlockHandler = useCallback(
    (id: string) => {
      setCurrentBlockId(id);
      const newBlock: IEditableBlock = { id: nanoid(), html: '', tag: 'p' };
      const index = blocks.map((b) => b.id).indexOf(id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index + 1, 0, newBlock);
      setBlocks(updatedBlocks);
    },
    [blocks]
  );

  const deleteBlockHandler = useCallback(
    (id: string) => {
      if (blocks.length > 1) {
        setCurrentBlockId(id);
        const index = blocks.map((b) => b.id).indexOf(id);
        // const deletedBlock = blocks[index];
        const updatedBlocks = [...blocks];
        updatedBlocks.splice(index, 1);
        setBlocks(updatedBlocks);
      }
    },
    [blocks]
  );

  const moveBlockFocusHandler = useCallback(
    (id: string, direction: 'up' | 'down') => {
      if (blocks.length > 1) {
        setCaretMoved({
          direction,
          id,
        });
      }
    },
    [blocks]
  );

  console.log(blocks);

  return (
    <div>
      {blocks.map((block, idx) => {
        const position = blocks.map((b) => b.id).indexOf(block.id) + 1;

        return (
          <EditableBlock
            position={position}
            key={block.id}
            block={block}
            onChange={updateBlockHandler}
            addBlock={addBlockHandler}
            deleteBlock={deleteBlockHandler}
            moveBlockFocus={moveBlockFocusHandler}
            placeholderText="Type page content"
          />
        );
      })}
    </div>
  );
};

type EditableBlockProps = {
  block: IEditableBlock;
  onChange: (key: string, content: IBlockContent) => void;
  addBlock: (key: string) => void;
  deleteBlock: (key: string) => void;
  moveBlockFocus: (key: string, direction: 'up' | 'down') => void;
  position: number;
  placeholderText?: string;
};

interface IBlockContent {
  html: string;
  tag: 'p' | 'h1' | 'h2' | 'h3';
}

export const EditableBlock = ({
  block,
  onChange,
  position,
  placeholderText = 'Type a page title...',
  ...props
}: EditableBlockProps) => {
  const contentEditable = React.createRef<HTMLElement>();

  const [content, setContent] = useState<IBlockContent>({
    html: block.html,
    tag: block.tag,
  });

  const [previousKey, setPreviousKey] = useState<string | null>();
  const [htmlBackup, setHtmlBackup] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState(false);

  const onChangeHandler = (e: ContentEditableEvent) => {
    setContent({ ...content, html: e.target.value });
  };

  // Useeffect to update onChange event
  useEffect(() => {
    onChange(block.id, content);
  }, [content]);

  // Set placeholder initially
  useEffect(() => {
    addPlaceholder(contentEditable.current!);
  }, []);

  const addPlaceholder = (elem: HTMLElement) => {
    // Check whether block is the only block and not empty
    const isFirstBlockWithoutHtml = position === 1 && !content.html;
    const isFirstBlockWithoutSibling = !elem?.parentElement?.nextElementSibling;
    if (isFirstBlockWithoutHtml && isFirstBlockWithoutSibling) {
      setContent({
        html: placeholderText,
        tag: 'h1',
      });
      setPlaceholder(true);
    }
  };

  const handleFocus = (e: any) => {
    // If a placeholder is set, we remove it when the block gets focused
    if (placeholder) {
      setContent({
        ...content,
        html: '',
      });
      setPlaceholder(false);
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    // Handle special keys
    console.log(e.key, e);
    if (e.key === '/') {
      setHtmlBackup(content.html);
    }
    if (e.key === 'Enter') {
      if (previousKey !== 'Shift') {
        e.preventDefault();
        props.addBlock(block.id);
      }
    }
    if ((e.key === 'Backspace' || e.key === 'Delete') && !content.html) {
      e.preventDefault();
      props.deleteBlock(block.id);
    }
    if (e.key === 'PageUp') {
      e.preventDefault();
      // console.log(e, contentEditable);
      props.moveBlockFocus(block.id, 'up');
    }
    if (e.key === 'PageDown') {
      e.preventDefault();
      // console.log(e, contentEditable);
      props.moveBlockFocus(block.id, 'down');
    }
    setPreviousKey(e.key);
  };
  // console.log(position);

  return (
    <div className="prose-sm w-full">
      <ContentEditable
        className={`my-0 p-2 hover:bg-gray-100 focus:bg-gray-50 rounded-md focus:outline-none ${
          placeholder ? 'text-gray-400' : 'text-black'
        }`}
        innerRef={contentEditable}
        html={block.html}
        tagName={block.tag}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        onFocus={handleFocus}
        data-position={position}
      />
    </div>
  );
};
