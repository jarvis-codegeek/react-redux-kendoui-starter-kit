function getRulesFromGuidelines(guidelines) {
  const resultArray = [];
  let totalRulesCount = 0;
  
  function findRules(group) {
    try {
      // Base case: If group contains Rules, collect data and count rules
      if (group.Rules) {
        resultArray.push({
          title: group.title,
          id: group.id,
          rulesCount: group.Rules.length,
          Rules: group.Rules
        });
        totalRulesCount += group.Rules.length;
        return;
      }
      
      // If group contains Groups, iterate through each group
      if (group.Groups) {
        for (const subgroup of group.Groups) {
          findRules(subgroup);
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

    return {
      rulesArray: resultArray,
      totalRulesCount: totalRulesCount
    };
  } catch (error) {
    console.error("An error occurred while processing guidelines:", error);
    return {
      rulesArray: [],
      totalRulesCount: 0
    };
  }
}
