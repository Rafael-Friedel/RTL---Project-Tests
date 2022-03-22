import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('TESTANDO COMPONENTE NOTFOUND', () => {
  it('Testa se a página contém um h2 com o texto Page requested not found 😭', () => {
    RenderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i,
    });
    const span = screen.getByText('😭');
    expect(heading).toBeInTheDocument();
    expect(span).toBeInTheDocument();
  });
  it('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    RenderWithRouter(<NotFound />);
    const imag = screen.getAllByRole('img');
    expect(imag[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
