"use client";

import { Loading } from "@/components/Loading";
import React, { FC, Fragment, useState } from "react";
import { useTags } from "@/hooks/tag/useTags";
import { useCreateTag } from "@/hooks/tag/useCreateTag";
import { Button } from "@/components/Buttons/Button";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Textarea,
  Transition,
} from "@headlessui/react";
import { useDeleteTag } from "@/hooks/tag/useDeleteTag";

export default function Page() {
  const { data: tags = [], isLoading } = useTags();
  const [isOpenAddTagDialog, setIsOpenAddTagDialog] = useState(false);
  const { createTag } = useCreateTag();
  const { deleteTag } = useDeleteTag();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className="p-1 relative overflow-hidden"
      style={{ height: "calc(100vh - 40px)" }}
    >
      <div className="absolute bottom-4 left-4">
        <Button
          variant="outlined"
          onClick={() => setIsOpenAddTagDialog(true)}
          title="タグを追加"
        />
      </div>
      <div className="">
        <div>
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="p-2 border-b flex items-center justify-between"
            >
              <span className="text-gray-600 mr-2 w-28">{tag.name}</span>{" "}
              {/* タグ名を削除ボタンの左横に表示 */}
              <Button
                variant="filled"
                onClick={() => deleteTag({ tagId: tag.id })} // タグ削除ボタン
                title="削除"
                className="text-red-500 ml-2 w-20" // ボタンを控えめに表示
              />
            </div>
          ))}
        </div>
      </div>
      <AddTagDialog
        isOpen={isOpenAddTagDialog}
        onClose={(tagName) => {
          setIsOpenAddTagDialog(false);
          if (!tagName) return;
          createTag({ tagName });
        }}
      />
    </div>
  );
}

const AddTagDialog: FC<{
  isOpen: boolean;
  onClose: (inputName: string) => void;
}> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState("");

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform translate-y-4 opacity-0"
      enterTo="transform translate-y-0 opacity-100"
      leave="transition duration-75 ease-in"
      leaveFrom="transform translate-y-0 opacity-100"
      leaveTo="transform translate-y-4 opacity-0"
    >
      <Dialog
        open={isOpen}
        onClose={() => {
          onClose(content);
          setContent("");
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="w-screen max-w-sm rounded bg-white p-2">
            <DialogTitle>タグ追加</DialogTitle>
            <Description className={"p-2"}>
              <Textarea
                className="w-full p-2 border-gray-300 rounded"
                autoFocus
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="タグ名"
              />
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};
