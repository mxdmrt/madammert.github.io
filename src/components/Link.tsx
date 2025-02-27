import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  createLink,
  LinkOptions as RouterLinkProps,
} from "@tanstack/react-router";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { Theme } from "../@types/theme";
import { useStore } from "../store/Store";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  routerLinkProps?: RouterLinkProps;
}

const StyledLink = styled.a<{ theme: Theme; contentAfter?: string }>(
  ({ theme, contentAfter }) => {
    const themeBgColor = () => {
      switch (theme.type) {
        case "light":
          return css`
            background-color: oklch(var(--colorForeground) / 0.05);
          `;
        case "dark":
          return css`
            background-color: oklch(var(--colorForeground) / 0.1);
          `;
        case "random":
          return theme.background.lightness > 45
            ? css`
                background-color: oklch(var(--colorForeground) / 0.05);
              `
            : css`
                background-color: oklch(var(--colorForeground) / 0.1);
              `;
      }
    };
    const afterElement =
      contentAfter &&
      css`
        &::after {
          content: "${contentAfter}";
          display: inline;
        }
      `;

    return css`
      display: inline-flex;
      color: inherit;
      text-decoration: underline;
      text-underline-offset: calc(1em / 4);
      text-decoration-thickness: calc(1em / 16);
      text-decoration-color: oklch(var(--colorForeground) / 0.2);
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: -0.4em;
        right: -0.6em;
        bottom: -0.4em;
        left: -0.6em;
        background-color: oklch(var(--colorForeground) / 0);
        border-radius: var(--borderRadius);
      }

      @media (hover: hover) {
        &:hover {
          text-decoration-color: oklch(var(--colorForeground) / 0);
          cursor: pointer;

          &::before {
            ${themeBgColor()}
          }
        }
      }

      ${afterElement}
    `;
  },
);

const CustomRouterLink = createLink(StyledLink);

export default function Link({
  children,
  routerLinkProps,
  ...props
}: LinkProps) {
  const { theme } = useStore();

  if (routerLinkProps) {
    return (
      <CustomRouterLink theme={theme} {...routerLinkProps} {...props}>
        {children}
      </CustomRouterLink>
    );
  }

  return (
    <StyledLink theme={theme} contentAfter="&#8599;" {...props}>
      {children}
    </StyledLink>
  );
}
