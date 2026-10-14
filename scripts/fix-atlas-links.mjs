import fs from 'node:fs/promises';
let t=await fs.readFile('src/course/atlas-extra.ts','utf8');const replacements=[
["d('whitepapers/latest/aws-overview/vmware-cloud-on-aws.html')","'https://aws.amazon.com/vmware/vmwarecloudonaws/'"],
["d('whitepapers/latest/aws-overview/amazon-eks-anywhere.html')","'https://aws.amazon.com/eks/eks-anywhere/'"],
["d('whitepapers/latest/aws-overview/amazon-eks-distro.html')","'https://aws.amazon.com/eks/eks-distro/'"],
["d('AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html')","d('AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html')"],
["d('awsconsolehelpdocs/latest/gsg/getting-started.html')","d('awsconsolehelpdocs/latest/gsg/what-is.html')"],
["d('wellarchitected/latest/userguide/intro.html')","d('wellarchitected/latest/userguide/tool.html')"],
["d('detective/latest/adminguide/what-is-detective.html')","d('detective/latest/userguide/what-is-detective.html')"],
["d('elastictranscoder/latest/developerguide/introduction.html')","d('elastictranscoder/latest/developerguide/history.html')"],
["The guide still names this service. Read its current official support notice before any practical design.","The guide still names this service. AWS documents end of support on 13 November 2025; study the historical role, not a new deployment recommendation."],
["Guide-listed recognition. Consult current official availability before proposing a practical deployment.","The guide lists this offering. AWS stopped reselling it on 30 April 2024; check current supplier and availability rather than assuming AWS can sell a new subscription."]];for(const [a,b] of replacements){if(!t.includes(a))throw Error(a);t=t.replace(a,b);}await fs.writeFile('src/course/atlas-extra.ts',t);
