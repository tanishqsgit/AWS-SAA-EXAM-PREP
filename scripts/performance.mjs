import {F} from './catalog.mjs';
export default [
F('Storage interface selection','3.1','ebs,efs,s3classes,fsx',[
'Use EBS for persistent block storage attached within an AZ.~EBS supplies block volumes for EC2 rather than a general cross-AZ shared filesystem.',
'Use Regional EFS for concurrent Linux NFS access.~EFS provides managed shared file access for Linux workloads.',
'Use S3 with object API access.~S3 suits object storage rather than direct filesystem or block-device semantics.',
'Use FSx for Windows File Server for SMB and Windows file integration.~FSx supplies managed Windows-compatible file shares.'
],[
'A database on EC2 needs a persistent raw block device with storage performance independently configurable. It does not need a shared mount across AZs. Which storage interface fits?|0',
'Linux workers must modify a common NFS directory concurrently across AZs without managing file servers. Which storage service fits?|1',
'An application stores immutable images by object key and retrieves them through HTTPS. No POSIX operations or mounted disks are required. Which storage model fits?|2',
'A Windows application requires SMB shares and Active Directory integration with native file permissions. It cannot be changed to an object API. Which service fits?|3',
'A single EC2 workload performs block-level random writes and must retain data across instance restarts. It can keep the volume in one AZ. Which storage choice fits?|0',
'A Linux Auto Scaling application expects shared NFS paths to survive individual node replacement. Which managed filesystem meets the access model?|1',
'A data lake ingests objects and its engines read data through S3 APIs. The priority is managed scalable object storage. Which option fits?|2',
'An on-premises Windows application migrates unchanged and needs a domain-integrated SMB filesystem. Which managed AWS file service matches these semantics?|3',
'An EC2 application requires direct disk formatting and block-level I/O. A shared distributed filesystem is unnecessary. Which service provides the required interface?|0',
'A content editing service has Linux instances in different AZs sharing file operations and directory semantics. Which service fits concurrent access?|1'
]),
F('Block I/O performance','3.1','ebs',[
'Use gp3 and provision the required IOPS and throughput within its supported range.~gp3 separates configurable performance from storage capacity.',
'Use an appropriate io2 provisioned-IOPS volume and compatible EC2 configuration.~Provisioned IOPS storage fits demanding consistent random I/O workloads beyond the chosen general-purpose design.',
'Use st1 for large sequential throughput-oriented nonboot data within its supported constraints.~Throughput-optimized HDD fits sequential access rather than small latency-sensitive random I/O.',
'Measure and correct the EC2 EBS bandwidth bottleneck before increasing volume performance further.~End-to-end I/O is bounded by both instance and volume capabilities.'
],[
'An EC2 application needs more IOPS on a small general-purpose SSD without allocating more space solely for performance. The requirement fits gp3 capability. Which design fits?|0',
'A critical database needs consistent random I/O above the approved general-purpose configuration. The selected instance supports the required provisioned I/O. Which storage tier fits?|1',
'A nonboot data volume serves large sequential log scans. Random latency is not a requirement and the supported HDD performance is sufficient. Which volume type fits?|2',
'A volume can deliver the configured throughput, but the EC2 instance EBS bandwidth limit is lower than required. Which action addresses the actual bottleneck?|3',
'A workload has ample disk space but needs independent throughput tuning on its general-purpose SSD. Its measured needs fit gp3. Which option avoids unnecessary storage expansion?|0',
'A transactional workload has sustained demanding random writes and a documented need for a provisioned-IOPS design. Compute bandwidth is already sufficient. Which storage choice fits?|1',
'A streaming archive reader processes large sequential blocks and accepts HDD latency. The disk is not a boot volume. Which EBS family fits this access pattern?|2',
'Storage tuning has no effect because the selected instance cannot deliver the combined volume bandwidth. Which part of the architecture should be corrected first?|3',
'A team wants general-purpose SSD storage with capacity and performance purchased independently, within supported ranges. Which volume design fits?|0',
'An I/O-intensive database exceeds the chosen gp3 performance envelope and has funding for the appropriate consistent provisioned-IOPS tier. Which design fits?|1'
]),
F('Elastic compute model','3.2','lambda,fargate,asg',[
'Use Lambda for the short event-driven task with supported runtime and limits.~Lambda executes bounded event-driven work without managing servers.',
'Use ECS on Fargate for the container workload that does not require host access.~Fargate runs supported containers without managing EC2 hosts.',
'Use EC2 with an appropriate instance type and Auto Scaling strategy.~EC2 provides instance and operating-system control for host-dependent workloads.',
'Use a queue and independently scalable workers for asynchronous processing.~Queued work can absorb producer bursts and separate worker scaling from request arrival.'
],[
'A function runs a brief transformation on each S3 event using a supported runtime. It fits Lambda limits and the team wants no server fleet. Which compute model fits?|0',
'A containerized service runs continuously and does not need privileged host access. The team wants to avoid maintaining EC2 container hosts. Which option fits?|1',
'A compute workload requires a custom kernel module and direct host administration. Serverless container and function environments cannot provide that control. Which compute model fits?|2',
'Uploads arrive in bursts and each conversion can complete later. Producer acceptance must not wait for available conversion capacity. Which compute interaction design fits?|3',
'A low-frequency event handler executes for seconds and can use a supported runtime. Always-running capacity is unnecessary. Which managed compute choice fits?|0',
'A long-running supported container process needs managed scheduling with no host operating-system work. It cannot be modeled as a short function invocation. Which design fits?|1',
'A legacy licensed application requires access to its instance operating system and installation of a system driver. Which compute architecture preserves these requirements?|2',
'A file-processing backlog should drive worker capacity while submissions remain responsive. Jobs do not need an immediate completed result. Which design supports independent scaling?|3',
'A supported scheduled cleanup executes briefly once an hour and is stateless. The team wants to maintain only the function code. Which compute model fits?|0',
'A service ships as a standard container and needs continuously running processes without host customization. The requirement is avoiding instance management. Which choice fits?|1'
]),
F('Demand-based scaling','3.2','scaling,asg,sqs,schedule,backlog',[
'Use target tracking on a suitable utilization or per-target request metric.~Target tracking adjusts capacity to maintain the chosen demand-related metric.',
'Use scheduled scaling before a known repeatable demand window.~Scheduled actions can prepare capacity before predictable load arrives.',
'Scale on queue backlog per active worker using an appropriate custom metric.~Backlog per worker reflects outstanding asynchronous work relative to processing capacity.',
'Set minimum capacity and multi-AZ placement to meet availability needs independently of scaling policy.~Scaling policy alone does not guarantee baseline redundancy.'
],[
'A stateless web tier experiences unpredictable requests, and requests per target correlate with load. The team wants capacity adjusted toward an approved target. Which policy fits?|0',
'Every weekday a known processing window begins at the same time. New instances need warm-up and must be ready before requests arrive. Which scaling design fits?|1',
'Queue workers are I/O-bound, so CPU does not reveal demand. The team needs capacity driven by pending jobs relative to worker count. Which metric fits?|2',
'An Auto Scaling group can shrink to one node in one AZ despite an availability requirement. Which capacity design must accompany its demand policy?|3',
'An EC2 API has variable traffic and a validated CPU target reflecting processing load. The architect wants managed continuous adjustment. Which policy fits?|0',
'A retail service knows the precise daily opening period and needs additional warm capacity before opening. Which planned scaling mechanism fits?|1',
'A conversion queue grows while average CPU remains low because workers wait on external APIs. Which scaling signal reflects the real pending work?|2',
'A service must remain resilient at low demand. Reactive scaling exists but the minimum fleet is insufficient for the required AZ diversity. Which control fits?|3',
'A web workload needs automatic capacity control around a tested per-target request rate rather than a fixed timetable. Which policy fits?|0',
'A daily import creates predictable load and bootstrap takes time. The business does not want to wait for load-triggered instance launches. Which approach fits?|1'
]),
F('DynamoDB consistency','3.3','dynamo',[
'Use a strongly consistent read from the base table or supported local secondary index.~Strong consistency is supported for table and LSI reads when requested.',
'Use eventually consistent reads where stale results are acceptable.~Eventual reads can reduce read capacity demand when the business tolerates staleness.',
'Read the base table with the required consistency instead of expecting a GSI to provide strong consistency.~Global secondary index reads do not support strong consistency.',
'Use a data access design that does not depend on immediate index propagation.~Asynchronous index propagation means a GSI query may not immediately reflect a recent write.'
],[
'A same-Region application must read the latest committed value of an item immediately after updating its base table. Which read design fits?|0',
'A product browsing page can tolerate briefly stale descriptions. The goal is avoiding unnecessary stronger-read capacity. Which read setting fits?|1',
'A team requests strong consistency on a global secondary index and receives an error. It knows the item primary key and needs the latest committed value. Which design fits?|2',
'A new order must be acknowledged even if its secondary-index search entry is not immediately visible. The workflow cannot rely on instant GSI propagation. Which design principle fits?|3',
'An authorization check reads a known table item and must reflect the latest committed same-Region update. Which supported consistency mode should be requested?|0',
'A dashboard displays historical metrics and brief stale reads are allowed. Stronger read semantics provide no business benefit. Which read mode fits?|1',
'A GSI search returned an older state after a write. The caller knows the base-table key and needs a fresh check before acting. Which read path fits?|2',
'A pipeline writes an item then searches a GSI. The application must remain correct if the index update is delayed. Which design removes an unsafe dependency?|3',
'A base-table stock lookup must reflect completed writes in the same Region before accepting a decision. Which read option supports this requirement?|0',
'A read-heavy page explicitly accepts propagation delay to reduce consumption. It queries supported DynamoDB data without a latest-write guarantee. Which read choice fits?|1'
]),
F('Partition and query design','3.3','partition,dynamo',[
'Use a high-cardinality partition key that distributes the expected request load.~Partition key distribution matters; adding total capacity alone may not resolve a hot key.',
'Add a suitable secondary index for the required alternate query access pattern.~Indexes support alternate keys instead of repeatedly scanning unrelated data.',
'Use a Query with an appropriate key condition rather than a table-wide Scan.~Key-based access limits the items evaluated for a known partition access pattern.',
'Use explicit write sharding and a compatible read aggregation strategy for an unavoidable hot logical key.~Sharding spreads logical-key writes but adds read-side complexity.'
],[
'A table uses one constant tenant key for nearly every active request. The application can redesign keys to spread load across many customers. Which design addresses skew?|0',
'An application needs efficient lookup by order status, but its primary key is order ID. Repeated full scans are too expensive. Which access-path change fits?|1',
'A service knows the customer partition key and wants orders within a sort-key time range. It currently scans every customer. Which request design fits?|2',
'One logical counter dominates writes and its business identity cannot change. The application can aggregate several physical keys when reading. Which design distributes the write load?|3',
'Most writes are concentrated on a date-only partition despite many devices. The application can include device identity in its access model. Which partition design reduces skew?|0',
'A customer support view must locate records by an alternate business identifier not present in the primary key. Which data access structure avoids recurring full scans?|1',
'An API reads items for one known account and a bounded sort-key prefix. Which operation aligns with that efficient key access pattern?|2',
'One event type generates intense writes to a single logical partition. Read consumers can fan out across explicitly sharded keys. Which strategy fits?|3',
'A data model routes almost all traffic to one popular category key. The model can use more distributed entity keys. Which design improves partition distribution?|0',
'A workload must query by a newly required attribute while retaining its existing primary key access. Which database structure provides the alternate path?|1'
]),
F('Caching trade-offs','3.3','cache,replicas,cloudfront',[
'Use ElastiCache for suitable repeated data reads with defined expiration and invalidation.~Application caching reduces repeated backend work but must respect allowed staleness.',
'Use read replicas for suitable SQL reads that can tolerate replication lag.~Replicas offload database queries without requiring every result to be held in an application cache.',
'Use CloudFront caching for cacheable content close to geographically distributed viewers.~Edge caching reduces repeated origin retrieval for correctly configured cacheable responses.',
'Read the authoritative data source when the request requires current state beyond the approved cache semantics.~A cache cannot guarantee freshness without a design satisfying the consistency requirement.'
],[
'An API repeatedly reads product metadata from a database. Brief staleness is approved and the application can invalidate changed keys. Which backend design fits?|0',
'Business analysts execute varied SQL reports and accept lag. Caching every report is impractical, but the application can use a read endpoint. Which design fits?|1',
'Users globally retrieve the same versioned public images. Origin fetches dominate latency. Which caching placement fits this static workload?|2',
'A decision must reflect the latest committed balance and no stale result is allowed. No suitable cache coherence guarantee exists. Which read source fits?|3',
'A service repeatedly calculates a stable leaderboard and accepts a short refresh interval. It can store the result in a shared in-memory cache. Which design reduces repeated database work?|0',
'A reporting workload has many distinct queries and can run on an asynchronous SQL copy. Which design offloads the primary without requiring a cache hit for each report?|1',
'A documentation site serves immutable asset names worldwide. The goal is retrieving objects near users and reducing origin traffic. Which architecture fits?|2',
'A security authorization check must observe an immediate revocation. The existing cache permits a stale interval. Which access design satisfies the strict requirement?|3',
'A database receives identical catalog lookups and the business has an explicit TTL and update invalidation policy. Which caching layer fits the server-side repeated reads?|0',
'A team can move stale-tolerant SELECT traffic to another SQL endpoint while writes remain on the primary. Which architecture fits the query model?|1'
]),
F('Load balancer selection','3.4','alb,albfeatures,nlbfeatures,gwlbfeatures,cloudfront',[
'Use an Application Load Balancer with host or path routing.~ALB supports HTTP-aware Layer 7 routing.',
'Use a Network Load Balancer for the supported TCP or UDP workload.~NLB provides Layer 4 load balancing rather than HTTP content routing.',
'Use a Gateway Load Balancer for compatible virtual network appliance traffic.~GWLB supports transparent deployment and scaling of compatible network appliances.',
'Use CloudFront for appropriately cacheable global web delivery.~CloudFront provides edge delivery rather than replacing every regional application load balancer function.'
],[
'One HTTPS entry point must send /catalog requests to one service and /checkout to another. Which load balancer routing model fits?|0',
'A service uses a custom TCP protocol rather than HTTP and needs managed transport-level load balancing. Which load balancer fits?|1',
'A network team deploys compatible virtual inspection appliances and needs transparent traffic distribution through them. Which load balancer fits?|2',
'A public site has repeated static asset requests from distant users and wants edge caching near viewers. Which delivery layer fits?|3',
'Several HTTP domains share one entry point but must route to different target groups by host header. Which regional load balancer fits?|0',
'A gaming backend uses a supported UDP protocol and cannot switch to HTTP. Which load balancing model fits the transport?|1',
'A security architecture requires scalable insertion of supported virtual firewall appliances in the network path. Which service is purpose-built for this model?|2',
'A media site serves identical versioned files globally. The goal is caching copies at edge locations rather than path-based regional target routing. Which layer fits?|3',
'An HTTP service needs distinct target groups chosen by URL path rules. Which load balancer supports this application-layer decision?|0',
'A long-lived TCP application needs transport-level targets, with no requirement to inspect HTTP headers. Which AWS load balancer family fits?|1'
]),
F('Hybrid connectivity','3.4','dx,vpn,endpoints',[
'Use Direct Connect for an appropriate dedicated network connection and separately design required encryption and redundancy.~Direct Connect supplies dedicated connectivity; encryption and high availability require suitable additional design.',
'Use Site-to-Site VPN for encrypted IPsec connectivity over the available internet path.~VPN provides encrypted hybrid tunnels without provisioning a dedicated physical circuit.',
'Use PrivateLink to consume a specific supported private service rather than broad VPC routing.~PrivateLink supplies service-specific private access, not full network transit.',
'Use appropriately routed VPC connectivity for network-to-network private access with nonoverlapping addressing.~General VPC connectivity requires a routing design rather than only a single service endpoint.'
],[
'A data center needs a dedicated AWS network path for sustained traffic. It accepts circuit provisioning time and will separately provide approved encryption and redundant paths. Which connection fits?|0',
'A branch needs encrypted AWS connectivity promptly using its existing internet access. Dedicated circuit lead time is unacceptable. Which connection fits?|1',
'A consumer needs only a vendor application endpoint privately and must not receive general access to the vendor VPC. Which model fits?|2',
'Two VPCs with nonoverlapping CIDRs need broad private network communication across several services. A service-only endpoint is insufficient. Which architecture class fits?|3',
'A company wants a private dedicated circuit with planned dual connectivity rather than traffic carried solely over the public internet. It understands the circuit alone is not its encryption policy. Which option fits?|0',
'A temporary office needs encrypted tunnels to AWS over its existing ISP. The short project does not justify a physical circuit. Which connectivity design fits?|1',
'Several customers need access to one private provider service while the provider hides unrelated subnets. Which private service exposure model fits?|2',
'An application spans two nonoverlapping VPCs and needs IP connectivity to several internal endpoints. Which network connectivity approach is appropriate?|3',
'Sustained hybrid traffic requires a dedicated line and the team can manage circuit installation and redundant design. Which connection class fits this requirement?|0',
'An on-premises router supports IPsec and needs encrypted connectivity with no new dedicated line. Which managed AWS hybrid connection fits?|1'
]),
F('VPC network topology','3.4','peering,tgw,endpoints',[
'Use VPC peering with explicit routes for a small pair of nonoverlapping VPCs.~Peering provides direct VPC connectivity but is not transitive.',
'Use Transit Gateway with suitable routing and segmentation for a hub-and-spoke network.~Transit Gateway supports centralized connectivity across multiple attached networks.',
'Use PrivateLink for consumer access to a specific provider service.~Service endpoints avoid granting general VPC connectivity.',
'Redesign overlapping address ranges or use an appropriate service-specific connectivity pattern.~Overlapping networks cannot be treated as ordinary nonoverlapping peering routes.'
],[
'Two VPCs with nonoverlapping ranges need direct private communication. No transit between other networks is required and a simple connection is preferred. Which topology fits?|0',
'Dozens of VPCs and hybrid attachments need centrally controlled network routing and segmentation. A peering mesh is becoming hard to administer. Which topology fits?|1',
'A vendor must expose only one application to many consumers without giving them routes to its entire VPC. Which connectivity model fits?|2',
'Two teams use the same CIDR and attempt ordinary peering for general network access. Which design action addresses the fundamental addressing problem?|3',
'An isolated application needs only a direct connection between two nonoverlapping VPCs, with no centralized transit requirement. Which low-complexity topology fits?|0',
'A company wants a shared transit hub across many VPCs and an on-premises network. Different route tables will enforce segmentation. Which service fits?|1',
'Customers should privately consume a service despite overlapping addresses, without full network adjacency. Which exposure model avoids a peering mesh?|2',
'A planned direct VPC connection has overlapping CIDRs and needs broad IP routing. Which architecture issue must be resolved rather than adding another peering route?|3',
'A development VPC communicates only with a tools VPC. Both have nonoverlapping ranges and there is no requirement to route through either to a third VPC. Which connection fits?|0',
'Peering connections A-B and B-C do not provide A-C transit. The estate needs managed hub routing among many networks. Which topology should replace that assumption?|1'
]),
F('Streaming ingestion','3.5','kinesis,firehose,sqs,glue',[
'Use Kinesis Data Streams with consumers designed for replay and processing requirements.~Data Streams supports retained stream records and consumer processing.',
'Use Amazon Data Firehose for supported managed delivery and optional transformation to destinations.~Firehose simplifies managed streaming delivery rather than providing the same consumer model as Data Streams.',
'Use SQS for independently processed asynchronous work items.~A queue buffers jobs but is not a retained replayable stream for multiple independent stream readers.',
'Use AWS Glue for supported managed batch data transformation and cataloging.~Glue is suited to managed data integration rather than low-latency per-record queue semantics.'
],[
'Sensor records must be processed by independent stream consumers and replayed from retained data when a consumer is updated. Which ingestion service fits?|0',
'A team wants managed buffered delivery of records into S3 with a supported transform and minimal custom delivery code. It does not need custom stream readers. Which service fits?|1',
'Each incoming file creates an independent processing job handled by one worker. Record replay across stream consumers is unnecessary. Which ingestion pattern fits?|2',
'Nightly datasets need schema-aware transformation into a columnar format and catalog integration. Immediate per-record processing is not required. Which service fits?|3',
'An event analytics pipeline needs several independent consumers reading the retained record stream at their own progress. Which ingestion design fits?|0',
'Logs must be buffered and delivered to a supported destination with managed retry handling. The team wants to avoid writing stream delivery workers. Which service fits?|1',
'A print farm accepts jobs for competing workers; one successful worker result completes each job. Which messaging service fits this job model?|2',
'An overnight ETL pipeline transforms partitioned CSV files and publishes table metadata. Which managed data integration service fits?|3',
'A consumer upgrade must reread available retained stream records. The architecture needs custom consumers rather than just destination delivery. Which service fits?|0',
'A telemetry producer only needs AWS-managed delivery to its data lake, with approved buffering. Custom stream consumption is outside scope. Which service fits?|1'
]),
F('Migration and file transfer','3.5','datasync,dms,transfer',[
'Use DataSync for supported bulk or recurring file and object transfers.~DataSync automates supported data transfers and verification rather than migrating database transaction semantics.',
'Use AWS DMS for a supported database migration with change data capture.~DMS supports database migration tasks and ongoing replication for supported sources and targets.',
'Use AWS Transfer Family for supported managed SFTP access backed by AWS storage.~Transfer Family supplies protocol-compatible managed file endpoints.',
'Use an application-level export and restore when the workload requires that explicitly tested migration method.~An export/restore workflow may be suitable when downtime is accepted and the supported application procedure is required.'
],[
'A company repeatedly copies files from a supported on-premises NFS server to AWS storage with managed scheduling and integrity checks. Which transfer service fits?|0',
'A supported relational database migration must keep changes flowing while applications prepare to cut over. Which managed migration service fits?|1',
'Partners require an SFTP endpoint and cannot change their file clients. The company wants managed access backed by S3 rather than running servers. Which service fits?|2',
'An application vendor mandates its own tested database export-and-restore procedure, and a planned downtime window is accepted. Which migration approach respects that constraint?|3',
'An operations team needs efficient recurring file synchronization from a supported SMB source to a supported AWS destination. Which service fits?|0',
'A migration needs full database load followed by supported change replication to reduce cutover downtime. Which service fits?|1',
'External suppliers upload files using SFTP credentials and the organization wants storage integration without host maintenance. Which managed endpoint fits?|2',
'A small application permits a long offline migration and requires a vendor-produced portable export as its only supported import format. Which approach fits?|3',
'Large file directories must move on a schedule with managed transfer verification. The data is files rather than a database change stream. Which service fits?|0',
'The source database remains writable during most of the migration and supported transaction changes must be copied to the target. Which migration design fits?|1'
]),
F('Analytics access patterns','3.5','athena,glue,kinesis,firehose',[
'Use Athena for SQL analysis of supported data in S3 without managing query servers.~Athena supports serverless queries against data sources including S3.',
'Use Glue to transform data and maintain an appropriate catalog.~Glue supports managed integration and cataloging rather than acting only as an interactive query interface.',
'Use Kinesis Data Streams for retained records and independent stream processing.~Streaming consumers suit continuous processing rather than ad hoc historical file queries.',
'Use Firehose for managed buffered delivery to supported destinations.~Managed delivery fits ingestion when custom stream replay consumers are not required.'
],[
'Analysts need occasional SQL queries over S3 logs and do not want to maintain query servers. Supported formats and catalog metadata are available. Which service fits?|0',
'Raw data requires scheduled format conversion and catalog updates before querying. Which managed data integration component fits?|1',
'A real-time analytics pipeline must process records continuously and allow consumers to replay retained input. Which ingestion component fits?|2',
'A producer needs managed buffered record delivery into S3 and does not require its own replay consumers. Which delivery service fits?|3',
'An audit team queries historical S3 datasets infrequently using SQL. The priority is avoiding always-running query infrastructure. Which option fits?|0',
'A data lake needs managed ETL that converts raw files into a partitioned curated dataset and tracks schemas. Which service fits?|1',
'Two independent streaming applications must read the same retained telemetry records. Which architecture provides the consumer-oriented stream?|2',
'Application logs need AWS-managed delivery to a supported lake destination with minimal custom infrastructure. Which service fits?|3',
'An S3 archive contains supported structured files. Business users want interactive SQL without operating a database cluster. Which query service fits?|0',
'A nightly preparation job needs managed transformations and table metadata rather than only reading existing files. Which service fits?|1'
]),
F('Database type choice','3.3','dynamo,aurora,cache,s3classes',[
'Use DynamoDB with a key-based data model designed for the required access patterns.~DynamoDB supports managed key-value/document workloads rather than arbitrary relational joins.',
'Use a suitable Aurora or RDS relational engine for the required SQL joins and transactions.~Relational engines fit relational schemas and SQL transaction needs.',
'Use ElastiCache as a suitable cache with authoritative durable storage elsewhere.~A cache can accelerate reads but must not replace required source-of-truth guarantees accidentally.',
'Use S3 for object payloads and an appropriate metadata store for lookup.~Object storage is suitable for large objects accessed by keys rather than relational rows.'
],[
'A service stores key-value items and retrieves them by well-defined primary-key patterns at variable scale. It requires no joins. Which database model fits?|0',
'A financial application needs supported SQL joins and multi-row relational transactions. The schema and access model are relational. Which engine class fits?|1',
'A catalog already has a durable database but repeated permitted-stale reads need much lower latency. Which additional data layer fits?|2',
'An application keeps media files by object key and only needs metadata queries separately. Storing the binary payload in the transactional database is unnecessary. Which payload design fits?|3',
'A session service uses known item keys, flexible documents, and managed scaling rather than ad hoc relational queries. Which store class fits?|0',
'An ERP system requires relational constraints and complex supported SQL across multiple tables. It cannot be remodeled into key-only access. Which database class fits?|1',
'The authoritative store is durable, and application cache misses can be refilled safely. The goal is accelerating repeated hot reads. Which layer fits?|2',
'A data platform stores immutable bulk objects and their location identifiers. The payloads do not require database-row semantics. Which storage architecture fits?|3',
'A user preferences service uses direct-key reads and writes of document items with no joins. Which purpose-built managed database fits?|0',
'A legacy SQL application depends on its relational engine semantics and supported transactions. Rewriting the model is disallowed. Which database choice fits?|1'
]),
F('Performance diagnosis','3.2','cloudwatch,scaling,ebs,proxy',[
'Measure workload metrics and trace the constrained resource before changing capacity.~Evidence identifies whether compute, I/O, connections, or an external dependency limits performance.',
'Scale the appropriate compute capacity using a validated demand signal.~Compute scaling addresses an actual compute-capacity bottleneck.',
'Tune the storage and instance I/O design to match measured requirements.~Storage performance must account for the end-to-end instance and volume path.',
'Use suitable database connection pooling for a supported relational workload.~Pooling reduces connection churn rather than replacing required compute or storage capacity.'
],[
'A web service has high latency but no evidence showing whether the problem is CPU, storage, or downstream calls. Which first architectural action is justified?|0',
'Monitoring shows sustained CPU saturation correlated with request load; downstream services have spare capacity and nodes are stateless. Which capacity response fits?|1',
'A disk-bound workload has adequate CPU and measured I/O requirements above its current storage configuration. Which resource design should be tuned?|2',
'Short serverless SQL connections saturate connection handling while query and storage capacity remain healthy. Which component fits the diagnosed problem?|3',
'Adding instances did not improve latency, and the bottleneck is still unknown. The team must avoid another unsupported capacity change. What should guide the next design?|0',
'A validated utilization metric shows that a stateless compute fleet cannot keep up with variable demand. The database is not constrained. Which design response fits?|1',
'The instance and volume throughput configuration cannot support the observed sequential I/O workload. Compute CPU is not limiting. Which architecture path should be corrected?|2',
'Database pressure follows bursts of connection creation rather than slow queries. The database supports RDS Proxy. Which design addresses that measured cause?|3',
'Only an aggregate latency alarm exists, and different requests depend on different resources. Which investigation step is needed before selecting a scaling target?|0',
'A fleet CPU bottleneck is measured and an appropriate scaling signal is already validated. Other tiers have capacity. Which adjustment fits the evidence?|1'
]),
F('Read scaling and caching controls','3.3','replicas,cache,dynamo',[
'Route lag-tolerant relational reporting reads to a suitable read replica.~A replica offloads eligible reads from a primary database.',
'Cache approved repeated reads with explicit expiry and invalidation behavior.~Caching needs a staleness policy as well as a fast storage layer.',
'Use authoritative strong-consistency reads for decisions requiring the latest committed state where supported.~Strict decisions must use a read path that meets their required consistency.',
'Send every latest-write-sensitive decision to an asynchronous SQL replica.~An asynchronous replica may not yet contain the latest write.',
'Use a short fixed cache TTL as the only guarantee for latest-write-sensitive decisions.~A TTL still permits a stale interval and cannot by itself prove the latest committed value.',
'Expect an RDS Multi-AZ DB instance standby to serve reporting SELECT queries.~That standby is for failover and does not serve read traffic.'
],[
'A SQL application has lag-tolerant reporting and repeated catalog reads that allow a defined stale interval. Strict decisions already use the writer. Which TWO read-scaling patterns fit?|0,1',
'Reporting is already offloaded. The application needs repeated stale-tolerant catalog caching and a correct path for latest-write-sensitive decisions. Which TWO controls fit?|1,2',
'Catalog caching is already correct. Reporting should leave the primary while strict decisions continue using an appropriate authoritative path. Which TWO controls fit?|0,2',
'The writer already handles strict decisions. The team must offload batch SELECTs and avoid repeating permitted-stale catalog lookups. Which TWO designs fit?|0,1',
'A replica already serves analytics. Product descriptions can be cached, but authorization decisions must see current committed state. Which TWO read strategies fit?|1,2',
'Repeated content reads are cached correctly. A reporting load must be isolated and transactional decisions must remain on a suitable current-state path. Which TWO designs fit?|0,2',
'Current-state business checks are correctly routed. Two remaining loads are lag-tolerant relational reports and frequently repeated stale-tolerant metadata. Which TWO controls fit?|0,1',
'Reporting capacity is sufficient through a replica. The application still needs cache rules for repeated data and a fresh source for strict checks. Which TWO controls fit?|1,2',
'Cache expiry and invalidation are approved. The remaining requirements are offloading reports and preserving latest-state decisions. Which TWO designs fit?|0,2',
'A primary serves strict writes and checks. The team can use an asynchronous reporting endpoint and controlled cache staleness for catalog reads. Which TWO additions fit?|0,1'
],true)
];
