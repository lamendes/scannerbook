/* eslint-disable no-plusplus */
import React, {useEffect} from 'react';
import Quagga from 'quagga';
import {validateIsbn} from '../../../services/books';

import {Video, Container, ScanMarker} from './styles';

function Scanner() {
  let scannerAttempts = 0;

  const onDetected = (result) => {
    Quagga.offDetected(onDetected);

    const isbn = result.codeResult.code;

    if (validateIsbn(isbn)) {
      alert(`ISBN é válido ${isbn}`);
    } else if (scannerAttempts >= 5) {
      alert(
        'Não é possível ler o código do livro, por favor, tente novamente.',
      );
    }

    scannerAttempts++;
    Quagga.onDetected(onDetected);
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#video'),
            constraints: {
              facingMode: 'environment',
            },
          },
          numOfWorkers: 1,
          locate: true,
          decoder: {
            readers: ['ean_reader'],
          },
        },
        (err) => {
          if (err) {
            console.error(err);
            alert(
              'Erro ao abrir a câmera do dispositivo, por favor, dê a permissão de uso.',
            );
          }

          Quagga.start();
        },
      );

      Quagga.onDetected(onDetected);
    }
  }, []);

  return (
    <>
      <Video id="video" />
      <Container>
        <ScanMarker>
          <img
            src="../../../assets/images/scan-mark.svg"
            alt="Marca para leitura do código"
            width="260"
            height="260"
          />
          <p className="label">Aponte para o código de barras do livro</p>
          {/* <img
            className="logo"
            src="../../../assets/images/logo.svg"
            alt="Marca para leitura do código"
            width="260"
            height="260"
          /> */}
        </ScanMarker>
      </Container>
    </>
  );
}

export default Scanner;
