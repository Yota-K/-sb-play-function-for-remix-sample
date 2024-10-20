import { expect, within } from "@storybook/test";
import { createRemixStub } from "@remix-run/testing";
import Page from "../routes/sample";

import type { ComponentType } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "routes/sample",
  component: Page,
  decorators: [
    (Story: ComponentType) => {
      const RemixStub = createRemixStub([
        {
          path: "/",
          Component: () => <Story />,
          loader() {
            return {
              id: 1,
              name: "hoge",
            };
          },
        },
      ]);

      return <RemixStub />;
    },
  ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const { findByText } = within(canvasElement);
    await expect(await findByText("id: 1")).toBeInTheDocument();
    await expect(await findByText("name: hoge")).toBeInTheDocument();
  },
};
