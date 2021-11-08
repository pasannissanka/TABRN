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

export const EditableContent = () => {
  const [blocks, setBlocks] = useState<IEditableBlock[]>([initialBlock]);
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null);

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
  }, [blocks, currentBlockId, prevBlocks]);

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

  const addBlockHandler = (id: string) => {
    setCurrentBlockId(id);
    const newBlock: IEditableBlock = { id: nanoid(), html: '', tag: 'p' };
    const index = blocks.map((b) => b.id).indexOf(id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (id: string) => {
    if (blocks.length > 1) {
      setCurrentBlockId(id);
      const index = blocks.map((b) => b.id).indexOf(id);
      // const deletedBlock = blocks[index];
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);
    }
  };

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
  position: number;
};

interface IBlockContent {
  html: string;
  tag: 'p' | 'h1' | 'h2' | 'h3';
}

export const EditableBlock = ({
  block,
  onChange,
  position,
  ...props
}: EditableBlockProps) => {
  const contentEditable = React.createRef<HTMLElement>();

  const [content, setContent] = useState<IBlockContent>({
    html: block.html,
    tag: block.tag,
  });

  const [previousKey, setPreviousKey] = useState<string | null>();
  const [htmlBackup, setHtmlBackup] = useState<string | null>(null);

  const onChangeHandler = (e: ContentEditableEvent) => {
    setContent({ ...content, html: e.target.value });
  };

  useEffect(() => {
    onChange(block.id, content);
  }, [content]);

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    console.log(e.key);
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
    setPreviousKey(e.key);
  };

  return (
    <div>
      <ContentEditable
        className="p-2 focus:outline-none"
        innerRef={contentEditable}
        html={block.html}
        tagName={block.tag}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        data-position={position}
      />
    </div>
  );
};
