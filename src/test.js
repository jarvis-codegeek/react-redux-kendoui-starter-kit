interface Rule {
  id: number;
  name: string;
}

interface Group {
  title: string;
  id: string;
  Rules?: Rule[];
  Groups?: { Group: Group }[];
}

interface Guideline {
  Group: Group;
}

interface Result {
  title: string;
  id: string;
  rulesCount: number;
  Rules: Rule[];
}

function getAllRulesFromGuidelines(guidelines: Guideline[]): Result[] {
  const resultArray: Result[] = [];

  function findRules(group: Group): void {
    try {
      // If group contains Rules, collect data and push to resultArray
      if (group.Rules) {
        resultArray.push({
          title: group.title,
          id: group.id,
          rulesCount: group.Rules.length,
          Rules: group.Rules
        });
      }

      // If group contains Groups, iterate through each group
      if (group.Groups) {
        for (const subgroup of group.Groups) {
          if (subgroup.Group) {
            findRules(subgroup.Group); // Access subgroup.Group before recursion
          }
        }
      }
    } catch (error) {
      console.error("An error occurred while finding rules:", error);
    }
  }

  try {
    // Iterate through each guideline in the guidelines array
    for (const guideline of guidelines) {
      if (guideline.Group) {
        findRules(guideline.Group);
      }
    }

    return resultArray;
  } catch (error) {
    console.error("An error occurred while processing guidelines:", error);
    return [];
  }
}

// Example usage
const guidelines: Guideline[] = [
  {
    Group: {
      title: "Main Group",
      id: "main-001",
      Groups: [
        {
          Group: {
            title: "Sub Group 1",
            id: "sub-001",
            Groups: [
              {
                Group: {
                  title: "Sub Sub Group 1",
                  id: "subsub-001",
                  Rules: [
                    { id: 1, name: "Rule 1" },
                    { id: 2, name: "Rule 2" }
                  ]
                }
              }
            ]
          }
        },
        {
          Group: {
            title: "Another Sub Group 1",
            id: "sub-002",
            Rules: [
              { id: 3, name: "Rule 3" }
            ]
          }
        }
      ]
    }
  },
  {
    Group: {
      title: "Another Main Group",
      id: "main-002",
      Groups: [
        {
          Group: {
            title: "Another Sub Group",
            id: "sub-003",
            Groups: [
              {
                Group: {
                  title: "Another Sub Sub Group",
                  id: "subsub-002",
                  Rules: [
                    { id: 4, name: "Rule 4" },
                    { id: 5, name: "Rule 5" }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }
];

const result = getAllRulesFromGuidelines(guidelines);
console.log(result);
