import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: #fff;
  width: 100%;
  border-radius: 4px;
`;

export const CityStateCEP = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 14px;
  margin-top: 5px;

  label {
    margin: auto 0;
  }
`;

export const StreetNumberAditional = styled.div`
  display: grid;
  grid-template-columns: 3fr 0.8fr 0.8fr;
  grid-column-gap: 14px;
  margin-bottom: 10px;
  label {
    margin: auto 0;
    margin-top: 18px;
  }
  input {
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
`;
