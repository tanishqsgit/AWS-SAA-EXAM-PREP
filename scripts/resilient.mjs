import {F} from './catalog.mjs';
export default [
F('Backup operations','2.2','backup,dr,cloudwatch',[
'Use AWS Backup plans to centrally schedule supported resource backups and retention.~AWS Backup centralizes supported backup policy and job management.',
'Test restoration of retained recovery points and measure recovery time.~A completed backup does not prove successful and timely recovery.',
'Copy appropriate backups to an approved secondary Region or account.~External recovery boundaries support regional loss or account isolation needs.',
'Monitor failed backup jobs and alert operators with an operational response process.~Backup monitoring detects failures that otherwise leave recovery gaps.'
],[
'A company manages backups for supported databases and filesystems through separate scripts. It needs centralized scheduling and retention policy with minimal custom orchestration. Which design fits?|0',
'Backup jobs report success, but the team has never recovered the application. The business needs evidence that the outage budget is achievable. What validates this requirement?|1',
'A recovery plan must survive loss of the primary Region. All current recovery points are local. Which backup placement change addresses this risk?|2',
'A scheduled backup has silently failed for several days. The team needs prompt operational detection and a defined remediation response. Which control fits?|3',
'Supported resources need a shared backup schedule and lifecycle policy selected by resource tags. The team wants a managed control plane rather than maintaining separate scripts. Which design fits?|0',
'A backup is present but the restored database requires unexpected configuration steps. What ongoing practice would expose these recovery dependencies before an incident?|1',
'Security requires recovery copies isolated from the workload account where the approved resource type supports copying. Which backup topology meets that boundary?|2',
'Operators only discover missing recovery points during restoration. The goal is detecting unsuccessful protection jobs soon after they run. Which control should be implemented?|3',
'New supported applications must inherit the approved schedule and retention without each team building its own backup scheduler. Which centralized service pattern fits?|0',
'A DR plan claims recovery in two hours from a retained backup. No measured restore exists. Which activity tests the claim rather than assuming it from job success?|1'
]),
F('Relational availability','2.2','rds,replicas',[
'Use an RDS Multi-AZ DB instance deployment with managed standby failover.~A Multi-AZ DB instance standby supports availability rather than read-query scaling.',
'Use an RDS read replica and route suitable reads to it.~Read replicas offload read traffic; asynchronous replication can produce stale reads.',
'Use database backups and a tested restore procedure.~Backups support recovery to retained points but require restoration time.',
'Use one larger Single-AZ database instance.~Vertical scaling can add capacity but leaves a single-AZ failure boundary.'
],[
'A transactional database needs managed failover after an Availability Zone outage. Read throughput is sufficient and application connection retry is supported. Which design primarily improves availability?|0',
'A reporting workload tolerates replication lag and overloads the primary with SELECT queries. The goal is offloading reads rather than improving write availability. Which design fits?|1',
'A database is corrupted by an accidental bulk update. The team must recover a prior good point, not simply fail over to a copy containing the corruption. Which protection supports recovery?|2',
'A noncritical development database is CPU-limited but can tolerate an AZ outage. Application changes and extra database nodes are disallowed. Which direct capacity change fits?|3',
'An RDS writer runs in one AZ and outage recovery currently requires manual restoration. The team wants an automatically maintained standby in another AZ. Which deployment should replace it?|0',
'A business intelligence application must stop consuming writer read capacity. Reports tolerate slightly stale data and can use another endpoint. Which design should be used?|1',
'A team needs recovery from accidental table deletion to a retained point before the operation. Replicas would also receive the delete. Which strategy addresses this failure mode?|2',
'A short-lived test environment needs more memory for its existing SQL engine and has no HA requirement. It must remain a single instance. Which option addresses capacity without changing topology?|3',
'A production database must survive infrastructure failure without relying on a human promoting a read replica. Which managed RDS instance deployment meets that operational requirement?|0',
'The writer has spare write capacity but analysts saturate its read I/O. Their queries can use an asynchronous copy. Which architecture separates this traffic?|1'
]),
F('Aurora continuity','2.2','aurora,proxy',[
'Add Aurora Replicas in different Availability Zones with an appropriate failover priority.~Replicas can be promoted and provide cross-AZ compute failover capacity.',
'Use the Aurora reader endpoint for eligible read-only workloads.~The reader endpoint directs connections to available replicas for read scaling.',
'Use RDS Proxy for supported database connection pooling and reconnect handling.~The proxy manages database connection reuse but does not create missing standby compute.',
'Retain backups and test point-in-time restoration for logical data loss.~Backups address corruption or deletion that can propagate through live replicas.'
],[
'An Aurora cluster has only a writer instance. Storage is distributed, but the team wants an already-running database instance available for promotion after writer failure. Which design fits?|0',
'A reporting service has many read-only connections and may tolerate replica lag. It should use replicas without hard-coding each instance endpoint. Which connection design fits?|1',
'A Lambda workload opens many short-lived SQL connections. The cluster already has cross-AZ replicas; the problem is connection pressure during bursts. Which managed component should be added?|2',
'A faulty application deletes rows on the Aurora writer and replicas reflect the deletion. The team needs to recover the pre-error state. Which strategy addresses this data-loss mode?|3',
'A production cluster must have promotable compute outside the writer AZ. The team will size it for failover and test reconnect behavior. Which architecture provides that capacity?|0',
'Analytics traffic should use existing Aurora read replicas rather than the writer. Queries are read-only and tolerate stale results. Which endpoint should the application use?|1',
'An Aurora application experiences connection storms from serverless consumers. Database instance capacity is sufficient and replicas already support failover. Which design reduces connection churn?|2',
'Operations needs to undo a mistakenly executed schema change. Failover would expose the same modified state. Which retained recovery mechanism should be planned?|3',
'A team assumed distributed Aurora storage removed the need for standby compute. It now requires a running cross-AZ instance for promotion. Which addition directly meets this need?|0',
'A read-heavy service must distribute new read connections among cluster replicas using a managed endpoint. It does not require strongly consistent reads from the writer. Which option fits?|1'
]),
F('Queue-based decoupling','2.1','sqs,sqsreliable',[
'Place jobs in SQS and use independently scalable consumers with idempotent processing.~A durable queue decouples producer rate from worker availability; standard delivery can repeat messages.',
'Publish to SNS with a separate SQS subscription for each processing service.~Fanout gives independent subscriber queues their own event copies.',
'Use a synchronous request-response API with explicit timeouts.~A synchronous call suits a caller that needs an immediate completed response, but couples caller latency to processing.',
'Store the durable job record and have workers claim jobs using suitable concurrency controls.~A persistent work table can retain jobs when the requirement includes querying their state.'
],[
'Uploads arrive faster than video workers can process them. Callers only need an accepted-job response, and workers can make retries idempotent. Which architecture buffers the workload?|0',
'Every order event must reach both billing and fulfillment, each with independent retry and backlog handling. A single worker pool must not consume the other service event copy. Which design fits?|1',
'A caller must receive a small computation result before completing its request and cannot poll for later completion. Processing is bounded and immediate. Which interaction style fits?|2',
'A legacy scheduler must expose queryable job states and supports database-backed atomic job claiming. A queue is not required and the state table is the system of record. Which architecture fits this constraint?|3',
'A batch producer must accept requests during worker maintenance. Jobs can wait and duplicate delivery is handled safely. Which managed buffering design is appropriate?|0',
'Inventory and notifications each require every product update with independent scaling. The services must not compete for the same copy. Which messaging topology meets the requirement?|1',
'A pricing endpoint must return the calculated quote in the same HTTP transaction. The business rejects asynchronous acceptance semantics. Which interaction is defensible?|2',
'Operators must search pending legacy jobs by business attributes before execution. The existing application supports a transactional work ledger and atomic claims. Which persistence approach preserves this model?|3',
'A conversion farm needs a backlog surviving consumer crashes. Producers must not block until conversion completes, and consumers support repeated delivery. Which architecture has the lowest messaging overhead?|0',
'One audit service and one indexing service need separate durable event copies and independent redelivery. Which fanout design avoids distributing each event to only one service?|1'
]),
F('Message processing reliability','2.1','sqsreliable,dlq,sqs,visibility,backlog',[
'Make processing idempotent and delete a message only after successful durable completion.~Repeated delivery can occur; deleting before completion risks losing unfinished work.',
'Set an appropriate visibility timeout and extend it for processing that legitimately takes longer.~Visibility timeout prevents concurrent redelivery during the normal processing interval.',
'Configure a dead-letter queue with a suitable retry limit and monitor it.~A DLQ isolates persistently failing messages for investigation.',
'Scale consumers based on meaningful queue backlog per worker and processing latency.~Backlog-based scaling aligns worker capacity with queued work.'
],[
'A worker charges a card then crashes before deleting the SQS message. The same message is received again. Which design prevents the duplicate delivery from charging twice?|0',
'A normal processing job takes longer than the queue visibility timeout and is picked up by another consumer. Which timeout design reduces concurrent processing without deleting work prematurely?|1',
'One malformed job fails on every delivery and repeatedly consumes worker capacity. The team needs it isolated after an approved number of retries. Which queue feature fits?|2',
'Workers are CPU-idle while a rapidly growing SQS backlog waits because each task performs external I/O. Which scaling signal is more closely aligned with this work demand?|3',
'An SQS consumer currently deletes messages before writing results, so a crash loses jobs. Which processing order and safety property preserves retries?|0',
'Most jobs finish quickly, but a valid subset takes longer. Consumers can report progress and renew visibility. Which design keeps valid long jobs from reappearing mid-execution?|1',
'A queue receives corrupt input that should be retained for diagnosis after repeated failures. The main queue must continue processing valid jobs. Which design fits?|2',
'A queue farm must increase capacity when pending work per active instance grows, even if CPU is low. Which metric strategy should govern scaling?|3',
'A durable fulfillment worker can receive a message more than once. Its output must be created once per business order using a persisted key. Which application behavior meets the requirement?|0',
'A worker needs additional time to finish a legitimate job already in progress. Other workers should not receive that job until the extension expires. Which queue mechanism should be adjusted?|1'
]),
F('Ordered workflows','2.1','fifo,steps,events,sns',[
'Use SQS FIFO with a message group per business entity and idempotent side effects.~FIFO preserves order within each group; external side effects still need safe processing.',
'Use Step Functions to coordinate explicit workflow steps, retries, and state.~A state machine manages ordered business workflow execution rather than only queue order.',
'Use EventBridge event rules to route events by their content to supported targets.~Rules provide event filtering and routing rather than strict ordered work execution.',
'Use SNS fanout to independent subscriber queues.~Fanout creates event copies for multiple consumers rather than coordinating dependent workflow steps.'
],[
'Balance updates must be processed in order for each account, while different accounts may run concurrently. Workers already implement safe repeated processing. Which messaging design fits?|0',
'A loan application requires identity checks, then approval, then disbursement, with tracked state and retries. The team wants managed coordination. Which service fits?|1',
'A company routes order events to different targets based on event type and region fields. Strict delivery order is unnecessary. Which architecture is appropriate?|2',
'Every purchase event must reach auditing and notifications independently. Neither subscriber should wait for the other or consume its copy. Which architecture fits?|3',
'Commands for one shipment must remain sequential, but commands for separate shipments should process concurrently. Which queue group strategy meets the requirement?|0',
'A multi-step data pipeline requires retry policies for each task and visible execution state. Ad hoc queue chains are becoming hard to maintain. Which orchestration design fits?|1',
'A SaaS event bus must route only refund events to a refund handler and other events elsewhere. The system requires content rules rather than per-customer sequence enforcement. Which service fits?|2',
'An image event must trigger both metadata enrichment and notification delivery with separate backlogs. The tasks are independent rather than a tracked sequence. Which topology fits?|3',
'An application receives ordered state changes for each device and can process separate devices in parallel. Which queue design scopes ordering to the required entity?|0',
'A process waits for a decision, branches by outcome, and then invokes downstream tasks. Operators need managed execution history. Which design provides business workflow state?|1'
]),
F('Stateless fleet availability','2.2','asg,alb,cache,health',[
'Run an Auto Scaling group across multiple AZs behind a load balancer.~Multi-AZ compute and managed instance replacement remove a single-instance or single-AZ serving dependency.',
'Externalize sessions to an appropriate shared store and keep application nodes stateless.~Shared state permits node replacement without losing node-local user sessions.',
'Use load balancer health checks and configure Auto Scaling to replace unhealthy targets appropriately.~Application health checks detect serving failures that infrastructure status alone may miss.',
'Use a tested immutable launch template and deploy replacement instances from it.~Reproducible images and configuration reduce dependence on manual instance repair.'
],[
'A web service runs on one EC2 instance. The application is stateless and the requirement is continued serving during an AZ outage. Which topology most directly improves availability?|0',
'A multi-AZ fleet stores shopping carts in local instance memory. Customers lose carts when a node is replaced. Which architectural change removes this state dependency?|1',
'EC2 status checks pass, but the application returns errors on one node. The fleet must automatically identify and replace that failing serving instance. Which health strategy fits?|2',
'A recovery plan depends on an administrator rebuilding servers by hand. The team wants identical automated replacements from approved configuration. Which deployment approach meets this requirement?|3',
'An online portal has shared session storage but all nodes are in one AZ. It must continue operating if that AZ fails. Which infrastructure change addresses this remaining risk?|0',
'Sticky sessions hide a local-session problem until a target fails. Session contents must survive node loss without tying customers to a specific instance. Which design fits?|1',
'An Auto Scaling group replaces stopped machines but not nodes with broken application routes. The load balancer can test a health endpoint. Which integration closes the detection gap?|2',
'The team cannot reconstruct the manual changes on production servers after replacement. All nodes must be reproducible from a versioned deployment definition. Which pattern fits?|3',
'A regional app must tolerate failure of one data center without requiring DNS migration to another Region. Its state is already externalized. Which compute topology fits?|0',
'A fleet scales in frequently, and session loss follows each scale-in event. The business requires independent serving nodes and durable session access. Which state design should replace local memory?|1'
]),
F('Shared file availability','2.2','efs,fsx,fsxha,ebs',[
'Use Regional EFS for shared Linux NFS access across AZs.~Regional EFS supports shared file access from multiple instances across Availability Zones.',
'Use an FSx for Windows File Server Multi-AZ deployment for SMB and Windows integration.~FSx for Windows supports managed Windows file semantics and Multi-AZ availability.',
'Use an EBS volume for single-instance block storage with a backup plan.~EBS suits block access but a normal volume is scoped to one AZ rather than a cross-AZ shared filesystem.',
'Use S3 object storage with an application designed for object APIs.~S3 supports durable object access; it is not a drop-in POSIX filesystem.'
],[
'Linux application nodes in two AZs need concurrent NFS access to shared uploaded files. The team wants a managed regional filesystem. Which storage architecture fits?|0',
'Windows application servers need shared SMB storage, Active Directory integration, and managed failover across AZs. Which filesystem deployment is appropriate?|1',
'A single test instance needs a persistent disk with block-level access. Cross-AZ sharing is not required and backups are accepted for recovery. Which storage choice fits?|2',
'A media application can use object APIs and does not require file locking or a mounted filesystem. It needs durable shared access without maintaining servers. Which storage model fits?|3',
'An Auto Scaling Linux fleet must access the same mutable directory after any instance replacement. Nodes run across AZs and need NFS semantics. Which architecture removes local file dependence?|0',
'A legacy Windows service cannot be changed from SMB and requires domain-based file access with AZ failover. Which managed storage design fits?|1',
'An existing application writes directly to a Linux block device on one EC2 instance. The noncritical environment accepts restore after AZ loss. Which storage model preserves the required interface?|2',
'A web service stores immutable images by key and can retrieve them through HTTPS APIs. Shared block mounts are unnecessary. Which durable managed store fits?|3',
'Two Linux servers must modify a common NFS directory concurrently from different AZs. A single-attached disk would not satisfy the access model. Which service fits?|0',
'A Windows fleet requires an HA file share with native SMB permissions. The architecture cannot substitute object API calls. Which managed option should be selected?|1'
]),
F('Logical data recovery','2.2','s3version,backup,dr',[
'Use versioned objects and retain earlier versions for individual-object recovery.~Earlier versions can recover an overwrite or deletion marker when they are retained.',
'Use retained backups and a tested point-in-time restore path for supported databases.~Recovery from logical corruption needs an earlier good data state.',
'Use multi-AZ replication with failover for infrastructure availability.~Live replicas can improve availability but can also receive valid logical deletes.',
'Use a tested cross-Region disaster recovery strategy with retained recovery data.~Regional disaster recovery requires recovery assets and procedures outside the failed Region.'
],[
'An S3 document was overwritten accidentally. The team needs only its previous retained contents, not a regional failover. Which preconfigured design supports this recovery?|0',
'A database application committed a faulty update to every live replica. The desired recovery point precedes the operation. Which protection addresses the actual loss?|1',
'A database host fails while its committed data remains valid. The objective is restoring serving availability through an existing standby. Which strategy fits this failure?|2',
'A Region-wide outage disables the primary service and its regional recovery resources. The business requires a documented recovery path in another Region. Which strategy fits?|3',
'A user deletes an S3 object without deleting its historical versions. The team must restore that object rather than all application infrastructure. Which mechanism helps?|0',
'An operator drops a database table and the change replicates successfully. Promoting a replica would retain the deletion. Which recovery strategy is appropriate?|1',
'An AZ disruption stops the primary database instance but leaves a healthy synchronized standby. The requirement is infrastructure continuity rather than undoing data changes. Which strategy fits?|2',
'A disaster plan must cover total regional loss, including the local backups being unreachable. Which placement and recovery strategy meets this boundary?|3',
'A script replaces an object with an empty file under the same key. Historical versions are retained. Which recovery source is most directly usable?|0',
'Corruption was introduced by an authorized SQL transaction yesterday. Replicas are healthy but contain the same corruption. Which strategy should supply the pre-corruption database state?|1'
]),
F('Disaster recovery economics','2.2','dr',[
'Use backup and restore with tested infrastructure recreation.~Backup and restore minimizes always-running recovery resources but typically requires the longest recovery process.',
'Use a pilot light with critical data services running and application capacity created during recovery.~Pilot light retains a core environment but needs provisioning or activation of additional serving components.',
'Use warm standby with a reduced-capacity functional environment and tested scale-up.~Warm standby trades ongoing cost for an already-functioning recovery stack.',
'Use a carefully designed multi-site active-active architecture with compatible data conflict handling.~Active-active keeps sites serving but increases data coordination and operational complexity.'
],[
'An internal application accepts recovery measured in many hours and restoration from recent backups. The lowest ongoing DR cost is the priority. Which tested strategy best fits?|0',
'A business must keep replicated critical data services ready in another Region, but can create web and application capacity during a disaster. Which strategy matches that design?|1',
'A critical app requires a functioning secondary stack before a disaster and permits scaling from reduced capacity during failover. Which strategy balances readiness and ongoing cost?|2',
'Users must be served by both Regions during normal operation. The application supports the required multi-site data coordination. Which strategy matches this serving model?|3',
'A monthly archive portal can remain unavailable while data and infrastructure are restored. The team cannot justify running a standby application all month. Which DR strategy fits?|0',
'A disaster design continuously replicates its data store but leaves compute serving capacity to be launched on demand. Which strategy describes the recovery architecture?|1',
'A secondary Region already runs all application tiers at smaller scale. A drill proves it can accept traffic then increase capacity. Which DR strategy is this?|2',
'A service must distribute live user traffic across independent regional stacks and has a tested write coordination design. Which DR approach meets normal multi-site serving?|3',
'A low-priority workload has generous RTO and RPO and budgets only for retained off-site data plus restore drills. Which strategy is most cost-aligned?|0',
'A team wants to avoid recreating its critical database during disaster recovery but accepts provisioning application servers after an incident. Which DR pattern fits this boundary?|1'
]),
F('RTO and RPO decisions','2.2','dr,backup',[
'Reduce backup intervals or use appropriate continuous data replication to tighten the recovery point.~RPO concerns acceptable lost data since the last recoverable point.',
'Automate and rehearse restoration or maintain more ready capacity to shorten recovery time.~RTO concerns time to restore service, including recovery operations.',
'Keep regional recovery data and infrastructure outside the primary Region.~Recovery from regional loss needs assets outside that regional boundary.',
'Test the actual restore and failover workflow against measured business objectives.~Documentation alone does not prove achievable recovery times or data recovery points.'
],[
'A restore drill finishes within the allowed outage time, but daily backups lose more changes than the business accepts. Which improvement targets the missed objective?|0',
'Data replication meets the permitted loss window, but manually creating application servers makes recovery too slow. Which improvement targets the missed objective?|1',
'Backups and the only recovery stack are in the same Region as production. The plan must cover regional loss. Which design change addresses this failure boundary?|2',
'A DR document promises a short outage, but no one has restored data or switched traffic. Which action provides evidence that the business objectives are achievable?|3',
'The business accepts two hours of outage but only minutes of data loss. Restoring is fast enough, while backups are too infrequent. Which control should be improved first?|0',
'A warm standby has current data but needs several manual approvals before serving traffic. The data-loss objective is met, but outage duration is excessive. Which improvement fits?|1',
'The primary Region and all local snapshots become unreachable during a regional disruption. Which recovery resource placement would address this risk?|2',
'A pilot light exists, but service quotas and traffic switching have never been exercised. What should validate the recovery assumptions before relying on them?|3',
'An hourly snapshot schedule creates an unacceptable potential lost-write window. Service restoration time is satisfactory. Which architectural change addresses the RPO requirement?|0',
'A complete backup is available, but restoring infrastructure takes longer than the outage budget. Which type of improvement addresses recovery time rather than data freshness?|1'
]),
F('Traffic failover','2.2','route53,alb',[
'Use Route 53 failover routing with appropriate health checks and a tested secondary endpoint.~Failover routing directs DNS answers according to configured health; cached answers may delay client movement.',
'Use an ALB across AZs with healthy targets in multiple AZs.~An ALB routes to healthy application targets within its regional deployment.',
'Use weighted Route 53 records for a controlled traffic allocation between healthy endpoints.~Weighted routing supports proportion-based traffic distribution rather than a strict primary-secondary policy.',
'Use latency-based Route 53 routing for appropriate geographically separated endpoints.~Latency routing selects an endpoint based on expected network latency rather than simple primary preference.'
],[
'An application normally uses one regional endpoint and should use another only when the primary is unhealthy. DNS cache behavior is accepted. Which routing policy fits?|0',
'A regional app needs requests distributed among healthy EC2 targets in two AZs. It does not need regional DNS failover. Which load balancing design fits?|1',
'A new regional release should receive a small planned proportion of requests while the existing endpoint receives the rest. Both are healthy. Which routing policy fits?|2',
'Users should receive an appropriate low-latency regional endpoint during normal operation. Both regions serve traffic and primary preference is unnecessary. Which routing policy fits?|3',
'A disaster plan uses an idle secondary web endpoint. Health checks should switch DNS answers away from an unhealthy primary, with client DNS caching understood. Which design fits?|0',
'One application server becomes unhealthy in a regional multi-AZ fleet. Traffic should use other healthy servers without changing the public domain record. Which regional component handles this?|1',
'Two production versions run at distinct endpoints. The release team wants adjustable percentage allocation instead of waiting for endpoint failure. Which DNS policy fits?|2',
'A globally served read-only site has healthy stacks in different Regions. Regional selection should aim at network latency rather than equal percentages. Which policy fits?|3',
'The business requires active-passive DNS behavior for two endpoints and will test health evaluation and TTL effects. Which route design matches this requirement?|0',
'An application scales EC2 targets within a Region and needs request-level routing around target failures. DNS changes should not be required for instance churn. Which design fits?|1'
]),
F('Event integration choices','2.1','events,sns,sqs,steps',[
'Use EventBridge rules to filter and route structured events to supported targets.~EventBridge provides event bus integration and content-based routing.',
'Use SNS with independent SQS subscribers for durable fanout.~Each subscribed queue retains its copy for independent consumer processing.',
'Use SQS between a producer and a competing worker pool.~One queue buffers jobs for workers sharing processing responsibility.',
'Use Step Functions for stateful coordination of dependent operations.~State machines coordinate execution steps and their error handling.'
],[
'Several event types enter a shared bus. Only events matching order status and region fields should reach a handler. Which integration fits content-based routing?|0',
'Every invoice notification must independently reach accounting and compliance even while either service is down. Which durable fanout architecture fits?|1',
'A producer submits independent work items and each should be handled by one of many equivalent workers. Which queue topology supports this workload?|2',
'An order flow needs payment completion before shipment creation and a tracked retry path for each task. Which managed coordination design fits?|3',
'A supported SaaS integration publishes structured events that must be routed to different AWS targets using event fields. Which architecture fits?|0',
'Audit, billing, and search all need their own durable copies of the same event. They must scale and retry independently. Which topology fits?|1',
'A conversion farm can process jobs asynchronously and all workers perform the same function. Every job does not need delivery to every worker. Which service pattern fits?|2',
'A process has dependent tasks, branching, and error recovery that must be visible in one execution history. Which architecture fits?|3',
'An event consumer should receive only inventory updates for one warehouse based on event content. The bus has several unrelated publishers. Which routing design fits?|0',
'A purchase event must reach two independently maintained systems with separate backlogs. Which design provides copies instead of making consumers compete for one message?|1'
]),
F('Database connection resilience','2.1','proxy,replicas,rds,cache',[
'Use RDS Proxy for supported connection pooling and failover handling.~The proxy manages connection reuse and improves handling of transient database connection changes.',
'Use RDS read replicas for lag-tolerant read offload.~Replicas address read capacity rather than excessive connection creation to the writer.',
'Use a Multi-AZ database deployment for managed standby failover.~Multi-AZ addresses database availability rather than eliminating every client retry.',
'Cache suitable repeated reads with an explicit expiry and invalidation strategy.~Caching reduces repeated database work but needs correctness rules for staleness.'
],[
'Thousands of Lambda invocations repeatedly open brief SQL connections. The supported database already has adequate query capacity and HA. Which design addresses connection churn?|0',
'A reporting service saturates the writer with SELECT queries and tolerates asynchronous results. It can use a separate database endpoint. Which design addresses read demand?|1',
'An RDS instance has no standby and needs managed failover during an AZ failure. Connection pooling alone does not create redundancy. Which deployment fits?|2',
'An application repeatedly reads the same product descriptions and accepts short-lived staleness. The goal is reducing repeated reads, not adding writer failover. Which design fits?|3',
'A serverless API spends resources creating and closing database connections for each request. Database topology is already resilient. Which managed intermediary fits?|0',
'An analytics tenant performs read-only queries that can lag behind transactions. The architect wants workload isolation from the primary reader load. Which design fits?|1',
'A single-AZ relational service must recover automatically after infrastructure failure with a standby. The requirement is availability rather than caching. Which design fits?|2',
'The catalog database receives many identical requests within minutes, and the business explicitly permits cached descriptions. Which design can absorb those duplicate reads?|3',
'A Lambda fleet creates bursty concurrent connection demand to a supported relational database. Query optimization and HA are already satisfactory. Which component directly mitigates connection pressure?|0',
'A report query is expensive but need not see the latest write. The application supports a reporting replica endpoint. Which capacity architecture fits?|1'
]),
F('Reliable consumer controls','2.1','sqsreliable,dlq,sqs,visibility',[
'Apply idempotency based on a persisted business operation identifier.~A durable idempotency check prevents repeated delivery from repeating side effects.',
'Delete a message only after its durable result has been committed.~Acknowledging completed work preserves retries after failed processing.',
'Use visibility timeout extensions while valid long-running work is in progress.~Extending visibility reduces redelivery during legitimate ongoing processing.',
'Increase message retention while leaving acknowledgment order, visibility, and application effects unchanged.~Retention preserves queued messages longer but does not make repeated effects safe or acknowledge completed work correctly.',
'Use FIFO producer deduplication as the only protection against repeated external side effects.~Producer deduplication does not make a consumer side effect safe after a crash between commit and deletion.',
'Reduce consumer polling frequency without changing visibility or processing logic.~Slower polling does not prevent unsafe redelivery or ensure durable completion before acknowledgment.'
],[
'A standard SQS worker may crash after committing an operation but before acknowledgment. Normal processing finishes within visibility. Which TWO controls preserve retries without duplicate effects?|0,1',
'Idempotency is already implemented. Some valid jobs exceed the visibility interval, and messages must not be deleted until output is durable. Which TWO controls fit?|1,2',
'The worker already acknowledges after committing results. It needs duplicate-side-effect protection and support for valid jobs longer than the initial timeout. Which TWO controls fit?|0,2',
'A payment consumer has bounded processing time but may receive the same business operation again after a crash. Which TWO behaviors protect the operation and retry path?|0,1',
'A durable idempotency ledger exists for image jobs. Output must finish before acknowledgment and lengthy conversions need visibility renewal. Which TWO controls fit?|1,2',
'A worker already deletes only after commit. Long-running jobs are redelivered and repeatable side effects remain unsafe. Which TWO controls address both risks?|0,2',
'Order workers handle repeated standard-queue deliveries. Jobs fit the timeout, but acknowledgment and side-effect safety need design. Which TWO patterns are required?|0,1',
'A message consumer has safe repeated effects but currently acknowledges before persistence and cannot extend long tasks. Which TWO corrections fit?|1,2',
'A pipeline acknowledgment order is already correct. It must now tolerate duplicates and prevent mid-job redelivery for long work. Which TWO controls fit?|0,2',
'A fulfilled order message reappears because the worker crashed before deletion. The design must make repeated fulfillment safe and acknowledge only completed work. Which TWO patterns fit?|0,1'
],true),
F('Recovery readiness controls','2.2','dr,backup,route53',[
'Maintain appropriately current recovery data outside the primary Region.~Off-Region recoverable data supports a regional-loss boundary.',
'Rehearse restoration, quota readiness, and capacity activation against the RTO.~Testing verifies the recovery stack can actually serve within the objective.',
'Test traffic switching and client reconnection behavior during recovery drills.~Serving recovery includes directing clients to the recovered endpoint.',
'Keep recovery data in multiple AZs of the primary Region without off-Region copies.~AZ diversity within one Region does not provide recoverable data outside a regional outage.',
'Shorten DNS TTLs without testing cutover or application reconnection behavior.~A shorter TTL does not prove successful client recovery or move existing connections automatically.',
'Monitor successful backup job completion as the only recovery-time evidence.~A completed backup does not measure restore, capacity activation, or service availability.'
],[
'Traffic switching drills already pass. A regional DR design still lacks off-Region data and has never activated recovery capacity. Which TWO controls address those remaining gaps?|0,1',
'Recovery data is current in another Region. The team has not rehearsed capacity activation or moving clients to the secondary. Which TWO tests complete service readiness?|1,2',
'The secondary stack has passed restore and capacity drills. Data placement and client traffic movement remain unverified. Which TWO controls meet those remaining concerns?|0,2',
'DNS recovery behavior is tested, but backup copies exist only locally and standby quotas are unknown. Which TWO controls address regional-loss readiness?|0,1',
'Off-Region recovery data is approved. Operators still need evidence that the recovered stack and client cutover meet the outage budget. Which TWO drills fit?|1,2',
'Restoration automation and quota tests pass. The plan must still ensure off-Region data and prove clients reconnect to the standby. Which TWO controls fit?|0,2',
'A regional exercise already validates endpoint switching. The data recovery location and standby launch readiness have not been prepared. Which TWO controls are necessary?|0,1',
'Replicated data is available in a secondary Region, but serving readiness and traffic cutover are assumptions. Which TWO actions validate the full recovery path?|1,2',
'A restored secondary service meets capacity requirements. The team must still validate data survival outside the primary and client rerouting. Which TWO controls fit?|0,2',
'An existing DNS failover exercise succeeds. The team now needs recoverable regional data and evidence that restore operations meet the RTO. Which TWO controls fit?|0,1'
],true),
F('Multi-AZ serving checklist','2.2','asg,sg,efs,health',[
'Distribute the serving fleet across multiple Availability Zones.~Multi-AZ placement removes a single-AZ compute dependency.',
'Externalize required session or shared file state to an appropriately resilient store.~Node replacement must not destroy required application state.',
'Use application-aware health checks and managed replacement of unhealthy instances.~Health integration replaces nodes that cannot serve even if the host remains running.',
'Enable sticky sessions while keeping required state only in node-local memory.~Session affinity does not preserve that state when the selected node fails or is replaced.',
'Use larger target instances while retaining all targets in one AZ.~Vertical capacity increases do not remove the single-AZ failure boundary.',
'Use only EC2 instance status checks to detect application-level serving failures.~Infrastructure checks can remain healthy when an application returns errors; application-aware checks are needed.'
],[
'Application-aware replacement works. A web fleet still runs in one AZ and keeps sessions locally. Which TWO architectural changes remove the remaining failure dependencies?|0,1',
'A fleet already spans AZs. Local sessions are lost during replacement and broken application nodes are not removed. Which TWO controls fit?|1,2',
'State is already stored in a resilient external service. The fleet is single-AZ and only checks host status, not application health. Which TWO changes address these risks?|0,2',
'A working health endpoint already drives replacement. Node-local uploads and a single-AZ deployment remain. Which TWO design changes improve continuity?|0,1',
'Targets run in multiple AZs, but users lose carts on node failure and the group ignores application errors. Which TWO controls address the remaining problems?|1,2',
'Sessions already survive instance loss. The application must now tolerate one AZ loss and replace nodes returning application failures. Which TWO controls fit?|0,2',
'A fleet can replace broken nodes but has no AZ diversity and holds required workflow state locally. Which TWO architecture changes are needed?|0,1',
'AZ diversity is configured. Shared files still live on individual nodes and application failures do not trigger replacement. Which TWO controls fit?|1,2',
'A resilient shared filesystem removes local-file dependence. All serving nodes are in one AZ and failures need manual detection. Which TWO changes meet availability requirements?|0,2',
'Health checks and replacement are correct, but losing the one serving AZ or a node local session breaks service. Which TWO changes remove these dependencies?|0,1'
],true)
];
