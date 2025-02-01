function getAllRulesFromGuidelines(guidelines) {
  const resultArray = [];

  function findRules(group) {
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
