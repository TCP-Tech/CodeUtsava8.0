document.addEventListener("contentsLoaded", async () => {
  async function getTeamData() {
    try {
      const response = await fetch('https://codeutsava.nitrr.ac.in/server/team/2024/');
      const data = await response.json();
      return data?.data;
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  }

  const teamData = await getTeamData();

  async function getMemberCard(member) {
    try {
      const response = await fetch(`../../components/TeamCard/${member.member_type}/${member.member_type}_CARD.html`);
      if (!response.ok) {
        throw new Error(`Failed to fetch member card: ${response.statusText}`);
      }
      const cardHtml = await response.text();
      const cardElement = document.createElement('div');
      cardElement.innerHTML = cardHtml;

      const h2Tag = cardElement.querySelector('.codeutsava_dynamic_domain_wise_member_name');
      if (h2Tag) {
        h2Tag.textContent = member.name;
      }
      const imgTag = cardElement.querySelector(".codeutsava_dynamic_domain_wise_member_img");
      if (imgTag) {
        const extractedPart = member?.image.split('/team')[1];
        imgTag.src = `https://codeutsava.nitrr.ac.in/static/uploads/team/${extractedPart}`;
      }
      const domainTag = cardElement.querySelector(".codeutsava_dynamic_domain");
      if (domainTag) {
        domainTag.textContent = member.domain;
      }
      const mail = cardElement.querySelector(".codeutsava_dynamic_mail");
      if (mail && member?.email) {
        mail.href = `mailto:${member?.email}`;  
      }
      const insta = cardElement.querySelector(".codeutsava_dynamic_insta");
      if (insta) {
        insta.href = member?.instagram;
      }
      const linkedin = cardElement.querySelector(".codeutsava_dynamic_linkedin");
      if (linkedin) {
        linkedin.href = member?.linkedin;
      }
      return cardElement.innerHTML;
    } catch (error) {
      console.error("Error fetching member card:", error);
    }
  }

  async function displayMembersByDesignation(designation, containerId) {

    const filteredMembers = teamData
      .filter(member => member.member_type === designation)
      .sort((a, b) => {
        const domainOrder = ['Technical', 'Design', 'Documentation', 'sponsorship', 'PR & Marketing'];
        return domainOrder.indexOf(a.domain) - domainOrder.indexOf(b.domain);
      });
   
      console.log(filteredMembers)

    const container = document.getElementById(containerId);
    container.innerHTML = ''; 

    for (const member of filteredMembers) {
      const memberCard = await getMemberCard(member);
      container.innerHTML += memberCard;
    }
  }

  if (teamData) {
    console.log("tea" , teamData)
    displayMembersByDesignation('OCO', 'codeutsava_overall-coordinatiors');
    displayMembersByDesignation('HCO', 'codeutsava_head-coordinatiors');
    displayMembersByDesignation('MNG', 'codeutsava_managers');
    displayMembersByDesignation('EXC', 'codeutsava_executives');
  }
});
