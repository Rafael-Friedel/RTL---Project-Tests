import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

describe('TESTANDO O COMPONENTE APP', () => {
  it('Verifica se existe os links de navegação', () => {
    RenderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const number4 = 4;

    expect(links[0]).toHaveTextContent(/home/i);
    expect(links[1]).toHaveTextContent(/about/i);
    expect(links[2]).toHaveTextContent(/favorite pokémons/i);
    expect(links).toHaveLength(number4);
  });
  it('Testa se ao clicar em home, a pagina é redirecionada para a path "/"', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/about');
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });
  it('Testa se ao clicar em about, a pagina é redirecionada para a path "/about"', () => {
    const { history } = RenderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });
  it('Testa ao clicar em favorite pokemons, é redirecionada para "/favorites"', () => {
    const { history } = RenderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite pok[eé]mons/i });
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Testa se é redirecionada para not found, ao entrar em url desconhecida', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/xablau');
    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i, level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });
});
