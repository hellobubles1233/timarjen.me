// Base colors
export const baseColors = {
  black: '#000000',
  white: '#FFFFFF',
  
  // Notion colors
  notion: {
    default: '#2F3437',
    light: '#37352F',
    gray: {
      light: '#E9ECEF',
      medium: '#9BA1A6',
      dark: '#787774'
    }
  },

  // Tag colors
  tags: {
    default: {
      bg: '#F1F1EF',
      text: '#37352F'
    },
    react: {
      bg: '#E6F6FF',
      text: '#0070F3'
    },
    typescript: {
      bg: '#E7EDF3',
      text: '#3178C6'
    },
    javascript: {
      bg: '#FFF7E6',
      text: '#F7B93E'
    },
    node: {
      bg: '#E7F5E7',
      text: '#539E43'
    },
    python: {
      bg: '#EEEEF5',
      text: '#3776AB'
    },
    design: {
      bg: '#FFE8F3',
      text: '#FF3399'
    },
    aws: {
      bg: '#FFF2E8',
      text: '#FF9900'
    },
    docker: {
      bg: '#E7F1FF',
      text: '#2496ED'
    },
    database: {
      bg: '#E8F5FF',
      text: '#336791'
    },
    api: {
      bg: '#F3E8FF',
      text: '#7C3AED'
    }
  },

  // Badge colors
  badges: {
    gray: {
      bg: '#F1F1EF',
      text: '#37352F'
    },
    brown: {
      bg: '#F4EEEE',
      text: '#9F6B53'
    },
    orange: {
      bg: '#FAEBDD',
      text: '#D4732C'
    },
    yellow: {
      bg: '#FBF3DB',
      text: '#DFAB01'
    },
    green: {
      bg: '#EEF3ED',
      text: '#448361'
    },
    blue: {
      bg: '#E9F3F7',
      text: '#2E7CB9'
    },
    purple: {
      bg: '#F4F0F7',
      text: '#6940A5'
    },
    pink: {
      bg: '#F9F2F5',
      text: '#AD1A72'
    },
    red: {
      bg: '#FDEBEC',
      text: '#E03E3E'
    }
  }
};

// Function to generate Tailwind color config
export function generateTailwindColors() {
  return {
    notion: {
      DEFAULT: baseColors.notion.default,
      light: baseColors.notion.light,
      gray: {
        light: baseColors.notion.gray.light,
        medium: baseColors.notion.gray.medium,
        dark: baseColors.notion.gray.dark
      }
    },
    tag: Object.entries(baseColors.tags).reduce((acc, [key, value]) => {
      acc[key] = {
        bg: value.bg,
        text: value.text
      };
      return acc;
    }, {} as Record<string, any>),
    badge: Object.entries(baseColors.badges).reduce((acc, [key, value]) => {
      acc[key] = {
        bg: value.bg,
        text: value.text
      };
      return acc;
    }, {} as Record<string, any>)
  };
}