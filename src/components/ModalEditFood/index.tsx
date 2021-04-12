import React, { Component, createRef, useRef, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';


interface FoodInterface {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (data: Omit<FoodInterface, 'id' | 'available'>) => void;
  editingFood: FoodInterface;
}

interface EditFoodInterface {
  name: string;
  description: string;
  price: string;
  image: string;
}

export default function ModalEditFood(props: ModalAddFoodProps) {
  const { isOpen, setIsOpen, editingFood, handleUpdateFood } = props;
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: EditFoodInterface) => {
    setIsOpen();
    await handleUpdateFood(data);
  }, [handleUpdateFood, setIsOpen]);

  // async function handleSubmit(data: EditFoodInterface) {
  //   setIsOpen();
  //   await handleUpdateFood(data);
  // };


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};


