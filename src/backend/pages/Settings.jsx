import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InsideBar } from '../components/InsideBar';
import { auth } from "../../config/Firebase";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore();

export const Settings = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterData, setCharacterData] = useState({
    name: '',
    race: '',
    class: '',
    level: 1,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    background: '',
    equipment: '',
    avatar: '',
  });
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal de troca de personagem
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const fetchCharacters = async () => {
        const querySnapshot = await getDocs(collection(db, 'users', currentUser.email, 'characters'));
        const characterList = [];
        querySnapshot.forEach((doc) => {
          characterList.push({ ...doc.data(), id: doc.id });
        });

        setCharacters(characterList);

        const mainCharacter = characterList.find((char) => char.isMain);
        if (mainCharacter) {
          setSelectedCharacter(mainCharacter);
          setCharacterData(mainCharacter); // Carregar dados do personagem principal
        }
      };
      fetchCharacters();
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedCharacter) {
      setCharacterData(selectedCharacter); // Atualiza os dados do personagem selecionado
    }
  }, [selectedCharacter]);

  const handleCharacterSelect = (id) => {
    const character = characters.find((char) => char.id === id);
    setSelectedCharacter(character);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCharacter) {
      alert('Por favor, selecione um personagem.');
      return;
    }

    try {
      await setDoc(doc(db, 'users', currentUser.email, 'characters', selectedCharacter.id), {
        ...characterData,
      });

      await setDoc(doc(db, 'users', currentUser.email, 'characters', selectedCharacter.id), {
        ...characterData,
        isMain: true,  // Adiciona um campo para marcar como principal
      });

      alert('Personagem atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar as configurações:', error);
      alert('Ocorreu um erro ao salvar as configurações do personagem.');
    }
  };

  const handleChangeMainCharacter = async (newMainCharacter) => {
    try {
      const characterUpdates = characters.map(async (character) => {
        if (character.id !== newMainCharacter.id) {
          await updateDoc(doc(db, 'users', currentUser.email, 'characters', character.id), {
            isMain: false,
          });
        }
      });

      await Promise.all(characterUpdates);

      await updateDoc(doc(db, 'users', currentUser.email, 'characters', newMainCharacter.id), {
        isMain: true,
      });

      setSelectedCharacter(newMainCharacter);
      setCharacterData(newMainCharacter);

      setShowModal(false);

      alert('Personagem principal trocado com sucesso!');
    } catch (error) {
      console.error('Erro ao trocar personagem principal:', error);
      alert('Ocorreu um erro ao trocar o personagem principal.');
    }
  };

  return (
    <Container>
      <InsideBar />
      <Title>Configurações de Personagem</Title>

      <SelectSection>
        {!selectedCharacter ? (
          <Select onChange={(e) => handleCharacterSelect(e.target.value)} value="">
            <option value="" disabled>Selecione um personagem</option>
            {characters.map((character) => (
              <option key={character.id} value={character.id}>
                {character.name}
              </option>
            ))}
          </Select>
        ) : (
          <div>Personagem Principal: {selectedCharacter.name}</div>
        )}
      </SelectSection>

      {selectedCharacter && (
        <Form onSubmit={handleSubmit}>
          <AvatarSection>
            <AvatarPreview src={characterData.avatar || 'https://www.placecage.com/200/300'} alt="Avatar" />
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setCharacterData((prevState) => ({
                      ...prevState,
                      avatar: reader.result,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <Button type="button" onClick={() => document.querySelector('input[type="file"]').click()}>
              Trocar Foto
            </Button>
          </AvatarSection>

          <Section>
            <h3>Dados do Personagem</h3>
            <Input
              type="text"
              name="name"
              value={characterData.name}
              onChange={handleInputChange}
              placeholder="Nome"
            />
            <Input
              type="text"
              name="race"
              value={characterData.race}
              onChange={handleInputChange}
              placeholder="Raça"
            />
            <Input
              type="text"
              name="class"
              value={characterData.class}
              onChange={handleInputChange}
              placeholder="Classe"
            />
            <Input
              type="number"
              name="level"
              value={characterData.level}
              onChange={handleInputChange}
              placeholder="Nível"
            />
            <Input
              type="number"
              name="strength"
              value={characterData.strength}
              onChange={handleInputChange}
              placeholder="Força"
            />
            <Input
              type="number"
              name="dexterity"
              value={characterData.dexterity}
              onChange={handleInputChange}
              placeholder="Destreza"
            />
            <Input
              type="number"
              name="constitution"
              value={characterData.constitution}
              onChange={handleInputChange}
              placeholder="Constituição"
            />
            <Input
              type="number"
              name="intelligence"
              value={characterData.intelligence}
              onChange={handleInputChange}
              placeholder="Inteligência"
            />
            <Input
              type="number"
              name="wisdom"
              value={characterData.wisdom}
              onChange={handleInputChange}
              placeholder="Sabedoria"
            />
            <Input
              type="number"
              name="charisma"
              value={characterData.charisma}
              onChange={handleInputChange}
              placeholder="Carisma"
            />
            <TextArea
              name="background"
              value={characterData.background}
              onChange={handleInputChange}
              placeholder="Histórico"
            />
            <TextArea
              name="equipment"
              value={characterData.equipment}
              onChange={handleInputChange}
              placeholder="Equipamentos"
            />
          </Section>

          <ButtonContainer>
            <Button type="button" onClick={() => setShowModal(true)}>
              Trocar Personagem Principal
            </Button>
            <Button type="submit">Salvar Configurações</Button>
          </ButtonContainer>
        </Form>
      )}

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Selecione o Novo Personagem Principal</h3>
            <CharacterList>
              {characters.filter(character => character.id !== selectedCharacter?.id).map((character) => (
                <CharacterItem key={character.id}>
                  <Button onClick={() => handleChangeMainCharacter(character)}>
                    {character.name}
                  </Button>
                </CharacterItem>
              ))}
            </CharacterList>
            <Button onClick={() => setShowModal(false)}>Fechar</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

// Estilos personalizados com styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #000;
  height: 100vh;
  color: #fff;
  justify-content: flex-start;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
`;

const SelectSection = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #222;
  color: #fff;
  border: 1px solid #333;
  margin-top: 10px;
  width: 80%;
  max-width: 300px;
`;

const Form = styled.form`
  background-color: #111;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const AvatarSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarPreview = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
  margin: 10px 0;

  &:hover {
    background-color: #d45d00;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #222;
  color: #fff;
  border: 1px solid #333;
  width: 80%;
  margin: 10px 0;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #222;
  color: #fff;
  border: 1px solid #333;
  width: 80%;
  height: 100px;
  margin: 10px 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
`;

const CharacterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const CharacterItem = styled.div`
  padding: 10px;
  background-color: #333;
  border-radius: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default Settings;